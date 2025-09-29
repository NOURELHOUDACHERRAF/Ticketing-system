<?php

namespace App\Enums;

enum TicketStatus: string
{
	case NOUVEAU = 'NOUVEAU';
	case EN_COURS = 'EN_COURS';
	case DEMANDE_AIDE = 'DEMANDE_AIDE';
	case RESOLU = 'RESOLU';
	case CLOS = 'CLOS';
}
