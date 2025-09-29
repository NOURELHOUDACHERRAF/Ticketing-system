<?php

namespace App\Enums;

enum ActionType: string
{
	case CREATION = 'CREATION';
	case MODIFICATION = 'MODIFICATION';
	case TRANSFERT = 'TRANSFERT';
	case DEMANDE_AIDE = 'DEMANDE_AIDE';
	case RESOLUTION = 'RESOLUTION';
	case FERMETURE = 'FERMETURE';
}
