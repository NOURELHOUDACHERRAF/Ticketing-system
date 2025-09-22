<?php

namespace App\Enums;

enum TicketPriority: string
{
	case CRITIQUE = 'CRITIQUE';
	case HAUTE = 'HAUTE';
	case NORMALE = 'NORMALE';
	case BASSE = 'BASSE';
}
