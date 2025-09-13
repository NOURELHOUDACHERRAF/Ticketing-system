CREATE DATABASE IF NOT EXISTS ticketing DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ticketing;

CREATE TABLE unite_org(
    Num INT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    Abreviation VARCHAR(50) NOT NULL,
    INDEX idx_Num (Num)
);

CREATE TABLE competence(
    id_competence INT PRIMARY KEY,
    Nom VARCHAR(255) NOT NULL,
    Description VARCHAR(255) NOT NULL
);

CREATE TABLE categorie(
    id_cat BIGINT AUTO_INCREMENT PRIMARY KEY,
    Nom VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    id_competence INT NOT NULL,
    FOREIGN KEY (id_competence) REFERENCES competence(id_competence) ON DELETE RESTRICT
);

CREATE TABLE superviseur (
    id_superviseur BIGINT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    login VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(150) UNIQUE,
    telephone VARCHAR(20),
    peut_approuver_transfert BOOLEAN DEFAULT TRUE,
    date_nomination TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_activation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_expiration TIMESTAMP NULL,
    actif BOOLEAN DEFAULT TRUE,
   -- Unit_org INT,
    -- FOREIGN KEY (Unit_org) REFERENCES unite_org(Num) ON DELETE SET NULL,
    INDEX idx_login_sup (login),
    INDEX idx_email_sup (email),
    INDEX idx_actif_sup (actif)
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
    derniere_connexion TIMESTAMP NULL,
    Unit_org INT,
    FOREIGN KEY (Unit_org) REFERENCES unite_org(Num) ON DELETE SET NULL,
    INDEX idx_login (login),
    INDEX idx_email (email),
    INDEX idx_actif (actif)
);

CREATE TABLE Agent (
    id_agent BIGINT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(50) UNIQUE, 
    password VARCHAR(255) NOT NULL,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    telephone VARCHAR(20),
    -- unite_org INT, 
    competence INT,
    date_activation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_expiration TIMESTAMP NULL,
    niveau_experience ENUM('JUNIOR', 'SENIOR', 'EXPERT') DEFAULT 'JUNIOR',
    disponible BOOLEAN DEFAULT TRUE,
    charge_actuelle INT DEFAULT 0,
    charge_maximale INT DEFAULT 10,
    date_affectation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    est_superviseur BOOLEAN DEFAULT FALSE, 
    
   -- FOREIGN KEY (unite_org) REFERENCES unite_org(Num) ON DELETE SET NULL,
    FOREIGN KEY (competence) REFERENCES competence(id_competence) ON DELETE SET NULL,
    
    INDEX idx_competence (competence),
    INDEX idx_disponible (disponible),
   -- INDEX idx_unit (unite_org),
    INDEX idx_login_agent (login),
    INDEX idx_email_agent (email)
);

CREATE TABLE ticket (
    id_ticket BIGINT AUTO_INCREMENT PRIMARY KEY,
    numero_ticket VARCHAR(50) NOT NULL UNIQUE,
    type VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    statut ENUM('NOUVEAU','EN_COURS', 'Demande d aide', 'RESOLU', 'CLOS') DEFAULT 'NOUVEAU',
    priorite ENUM('CRITIQUE', 'HAUTE', 'NORMALE', 'BASSE') DEFAULT 'NORMALE',
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    date_echeance TIMESTAMP NULL,
    date_resolution TIMESTAMP NULL,
    utilisateur_id BIGINT,
    agent_id BIGINT,
    superviseur_id BIGINT,
    categorie_id BIGINT,
    motif TEXT,
    urgence ENUM('FAIBLE', 'MOYENNE', 'ELEVEE', 'CRITIQUE') DEFAULT 'MOYENNE',
    
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id_utilisateur) ON DELETE SET NULL,
    FOREIGN KEY (agent_id) REFERENCES Agent(id_agent) ON DELETE SET NULL,
    FOREIGN KEY (superviseur_id) REFERENCES superviseur(id_superviseur) ON DELETE SET NULL, 
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


CREATE TABLE transfert (
    id_transfert BIGINT AUTO_INCREMENT PRIMARY KEY,
    ticket_id BIGINT NOT NULL,
    agent_source_id BIGINT NOT NULL,
    agent_destination_id BIGINT,
    superviseur_id BIGINT NOT NULL,
    motif_transfert TEXT NOT NULL,
    date_demande TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_approbation TIMESTAMP NULL,
    date_completion TIMESTAMP NULL,
    statut ENUM('DEMANDE', 'EN_ATTENTE', 'APPROUVE', 'REFUSE', 'COMPLETE', 'ANNULE') DEFAULT 'DEMANDE',
    commentaires TEXT,
    raison_refus TEXT,
    priorite_transfert ENUM('NORMALE', 'URGENTE') DEFAULT 'NORMALE',
    
    FOREIGN KEY (ticket_id) REFERENCES ticket(id_ticket) ON DELETE CASCADE,
    FOREIGN KEY (agent_source_id) REFERENCES agent(id_agent) ON DELETE RESTRICT,
    FOREIGN KEY (agent_destination_id) REFERENCES agent(id_agent) ON DELETE SET NULL,
    FOREIGN KEY (superviseur_id) REFERENCES superviseur(id_superviseur) ON DELETE RESTRICT,
    
    INDEX idx_ticket_id_transfert (ticket_id),
    INDEX idx_statut_transfert (statut),
    INDEX idx_date_demande (date_demande),
    INDEX idx_agent_source (agent_source_id),
    INDEX idx_superviseur_transfert (superviseur_id)
);

CREATE TABLE historique (
    id_historique BIGINT AUTO_INCREMENT PRIMARY KEY,
    ticket_id BIGINT NOT NULL,
    utilisateur_id BIGINT,
    action VARCHAR(100) NOT NULL,
    -- ancienne_valeur TEXT,
    -- nouvelle_valeur TEXT,
    date_action TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    commentaire TEXT,
    -- adresse_ip VARCHAR(45),
    type_action ENUM('CREATION', 'MODIFICATION', 'TRANSFERT', 'Demande d aide', 'RESOLUTION', 'FERMETURE') DEFAULT 'MODIFICATION',
    
    FOREIGN KEY (ticket_id) REFERENCES ticket(id_ticket) ON DELETE CASCADE,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id_utilisateur) ON DELETE SET NULL,
    
    INDEX idx_ticket_id_hist (ticket_id),
    INDEX idx_date_action (date_action),
    INDEX idx_type_action (type_action),
    INDEX idx_utilisateur_hist (utilisateur_id)
);

CREATE TABLE message_ticket (
    id_message BIGINT AUTO_INCREMENT PRIMARY KEY,
    ticket_id BIGINT NOT NULL,
    expediteur_id BIGINT NOT NULL,
    type_expediteur ENUM('UTILISATEUR', 'AGENT', 'SUPERVISEUR') NOT NULL,
    contenu TEXT NOT NULL,
    date_envoi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lu BOOLEAN DEFAULT FALSE,
    date_lecture TIMESTAMP NULL,
   -- type_message ENUM('MESSAGE', 'COMMENTAIRE_INTERNE', 'NOTE_RESOLUTION', 'DEMANDE_INFO') DEFAULT 'MESSAGE',
    priorite ENUM('NORMALE', 'IMPORTANTE') DEFAULT 'NORMALE',
    piece_jointe VARCHAR(500) NULL,
    
    FOREIGN KEY (ticket_id) REFERENCES ticket(id_ticket) ON DELETE CASCADE,
    
    INDEX idx_ticket_message (ticket_id),
    INDEX idx_expediteur (expediteur_id, type_expediteur),
    INDEX idx_date_envoi_msg (date_envoi),
    INDEX idx_lu_msg (lu)
   -- INDEX idx_type_message (type_message)
);

CREATE TABLE notification (
    id_notification BIGINT AUTO_INCREMENT PRIMARY KEY,
    destinataire_id BIGINT NOT NULL,
    type_destinataire ENUM('UTILISATEUR', 'AGENT', 'SUPERVISEUR') NOT NULL,
    type ENUM('NOUVEAU_TICKET', 'TRANSFERT_DEMANDE', 'TRANSFERT_APPROUVE', 'TICKET_ASSIGNE', 'ECHEANCE_PROCHE', 'TICKET_RESOLU', 'COMMENTAIRE_AJOUTE', 'NOUVEAU_MESSAGE') NOT NULL,
    titre VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    date_envoi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lu BOOLEAN DEFAULT FALSE,
    date_lecture TIMESTAMP NULL,
    ticket_id BIGINT,
    message_id BIGINT NULL, 
    priorite ENUM('BASSE', 'NORMALE', 'HAUTE') DEFAULT 'NORMALE',
    canal ENUM('SYSTEME', 'EMAIL', 'SMS') DEFAULT 'SYSTEME',
    
    FOREIGN KEY (ticket_id) REFERENCES ticket(id_ticket) ON DELETE CASCADE,
    FOREIGN KEY (message_id) REFERENCES message_ticket(id_message) ON DELETE CASCADE,
    
    INDEX idx_destinataire_notif (destinataire_id, type_destinataire),
    INDEX idx_lu (lu),
    INDEX idx_date_envoi (date_envoi),
    INDEX idx_type (type),
    INDEX idx_ticket_notif (ticket_id)
);

DELIMITER $$


CREATE TRIGGER tr_generate_ticket_number 
BEFORE INSERT ON ticket
FOR EACH ROW
BEGIN
    DECLARE next_number INT;
    DECLARE year_part VARCHAR(4);
    
    SET year_part = YEAR(CURDATE());
    
    SELECT COALESCE(MAX(CAST(SUBSTRING(numero_ticket, 6) AS UNSIGNED)), 0) + 1 
    INTO next_number
    FROM ticket 
    WHERE numero_ticket LIKE CONCAT(year_part, '%');
    
    SET NEW.numero_ticket = CONCAT(year_part, '-', LPAD(next_number, 6, '0'));
END$$
