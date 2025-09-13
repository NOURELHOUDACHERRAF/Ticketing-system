CREATE DATABASE IF NOT EXISTS ticket ;
USE ticket;

CREATE TABLE admin (
    id_admin BIGINT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    login VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(150) UNIQUE,
    telephone VARCHAR(20)
);

CREATE TABLE unite_org(
    Num INT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    Abreviation VARCHAR(50) NULL,
    INDEX idx_Num (Num)
);

CREATE TABLE agent (
    id_agent BIGINT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(50) UNIQUE, 
    password VARCHAR(255) NOT NULL,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    telephone VARCHAR(20),
    groupe BIGINT NULL,
    date_activation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_expiration TIMESTAMP NULL,
    cree_par BIGINT NOT NULL,
    est_superviseur BOOLEAN DEFAULT FALSE, 
    FOREIGN KEY (cree_par) REFERENCES admin(id_admin) ON DELETE CASCADE,
    INDEX idx_groupe (groupe),
    INDEX idx_login_agent (login),
    INDEX idx_email_agent (email)
);

CREATE TABLE groupe(
    id_groupe BIGINT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL UNIQUE,
    domaine VARCHAR(50) NOT NULL,
    superviseur_id BIGINT NULL,
    cree_par BIGINT NOT NULL,
    FOREIGN KEY (superviseur_id) REFERENCES agent(id_agent) ON DELETE SET NULL,
    FOREIGN KEY (cree_par) REFERENCES admin(id_admin) ON DELETE CASCADE
);

ALTER TABLE agent 
    ADD CONSTRAINT fk_agent_groupe FOREIGN KEY (groupe) REFERENCES groupe(id_groupe) ON DELETE SET NULL;

CREATE TABLE categorie(
    id_cat BIGINT AUTO_INCREMENT PRIMARY KEY,
    Nom VARCHAR(100) NOT NULL,
    description VARCHAR(255) NULL,
    id_grp BIGINT NOT NULL,
    FOREIGN KEY (id_grp) REFERENCES groupe(id_groupe) ON DELETE RESTRICT
);

CREATE TABLE utilisateur (
    id_utilisateur BIGINT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    login VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(150) UNIQUE,
    telephone VARCHAR(20),
    date_activation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_expiration TIMESTAMP NULL,
    actif BOOLEAN DEFAULT TRUE,
    Unit_org INT NULL,
    cree_par BIGINT NOT NULL,
    FOREIGN KEY (Unit_org) REFERENCES unite_org(Num) ON DELETE SET NULL,
    FOREIGN KEY (cree_par) REFERENCES admin(id_admin) ON DELETE CASCADE,
    INDEX idx_login (login),
    INDEX idx_email (email),
    INDEX idx_actif (actif)
);

CREATE TABLE ticket (
    id_ticket BIGINT AUTO_INCREMENT PRIMARY KEY,
    numero_ticket VARCHAR(50) NOT NULL UNIQUE,
    type VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    statut ENUM('NOUVEAU','EN_COURS','DEMANDE_AIDE','RESOLU','CLOS') DEFAULT 'NOUVEAU',
    priorite ENUM('CRITIQUE','HAUTE','NORMALE','BASSE') DEFAULT 'NORMALE',
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    date_resolution TIMESTAMP NULL,
    utilisateur_id BIGINT NULL,
    agent_id BIGINT NULL,
    superviseur_id BIGINT NULL,
    categorie_id BIGINT NULL,
    motif TEXT,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id_utilisateur) ON DELETE SET NULL,
    FOREIGN KEY (agent_id) REFERENCES agent(id_agent) ON DELETE SET NULL,
    FOREIGN KEY (superviseur_id) REFERENCES agent(id_agent) ON DELETE SET NULL, 
    FOREIGN KEY (categorie_id) REFERENCES categorie(id_cat) ON DELETE SET NULL,
    INDEX idx_numero_ticket (numero_ticket),
    INDEX idx_statut (statut),
    INDEX idx_priorite (priorite),
    INDEX idx_date_creation (date_creation),
    INDEX idx_client_id (utilisateur_id),
    INDEX idx_agent_id (agent_id),
    INDEX idx_superviseur_id (superviseur_id),
    INDEX idx_categorie_id (categorie_id)
);

CREATE TABLE historique (
    id_historique BIGINT AUTO_INCREMENT PRIMARY KEY,
    ticket_id BIGINT NOT NULL,
    utilisateur_id BIGINT NULL,
    agent_id BIGINT NULL,
    action VARCHAR(100) NOT NULL,
    date_action TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    commentaire TEXT NULL,
    type_action ENUM('CREATION','MODIFICATION','TRANSFERT','DEMANDE_AIDE','RESOLUTION','FERMETURE') DEFAULT 'MODIFICATION',
    FOREIGN KEY (ticket_id) REFERENCES ticket(id_ticket) ON DELETE CASCADE,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id_utilisateur) ON DELETE SET NULL,
    FOREIGN KEY (agent_id) REFERENCES agent(id_agent) ON DELETE SET NULL,
    INDEX idx_ticket_id_hist (ticket_id),
    INDEX idx_date_action (date_action),
    INDEX idx_type_action (type_action),
    INDEX idx_utilisateur_hist (utilisateur_id)
);

CREATE TABLE message_ticket (
    id_message BIGINT AUTO_INCREMENT PRIMARY KEY,
    ticket_id BIGINT NOT NULL,
    expediteur_id BIGINT NOT NULL,
    type_expediteur ENUM('UTILISATEUR','AGENT','SUPERVISEUR') NOT NULL,
    contenu TEXT NOT NULL,
    date_envoi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    piece_jointe VARCHAR(500) NULL,
    FOREIGN KEY (ticket_id) REFERENCES ticket(id_ticket) ON DELETE CASCADE,
    INDEX idx_ticket_message (ticket_id),
    INDEX idx_expediteur (expediteur_id, type_expediteur),
    INDEX idx_date_envoi_msg (date_envoi)
);

CREATE TABLE notification (
    id_notification BIGINT AUTO_INCREMENT PRIMARY KEY,
    destinataire_id BIGINT NOT NULL,
    type_destinataire ENUM('UTILISATEUR','AGENT','SUPERVISEUR') NOT NULL,
    type ENUM('NOUVEAU_TICKET','DEMANDE_AIDE','TRANSFERT_APPROUVE','TICKET_ASSIGNE','TICKET_RESOLU','NOUVEAU_MESSAGE') NOT NULL,
    titre VARCHAR(200) NULL,
    ticket_id BIGINT NOT NULL,
    message_id BIGINT NULL, 
    FOREIGN KEY (ticket_id) REFERENCES ticket(id_ticket) ON DELETE CASCADE,
    FOREIGN KEY (message_id) REFERENCES message_ticket(id_message) ON DELETE CASCADE,
    INDEX idx_destinataire_notif (destinataire_id, type_destinataire),
    INDEX idx_type (type),
    INDEX idx_ticket_notif (ticket_id)
);
