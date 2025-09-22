<?php

namespace App\Enums;

enum ActorType: string
{
	case UTILISATEUR = 'UTILISATEUR';
	case AGENT = 'AGENT';
	case SUPERVISEUR = 'SUPERVISEUR';
}
