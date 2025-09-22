<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $driver = DB::getDriverName();

        if ($driver === 'mysql') {
            // 1) Temporarily allow both values in the ENUM
            DB::statement("ALTER TABLE `historique` MODIFY COLUMN `type_action` ENUM('CREATION','MODIFICATION','ASSIGNATION','TRANSFERT','DEMANDE_AIDE','RESOLUTION','FERMETURE') DEFAULT 'CREATION'");

            // 2) Update existing rows to the new value
            DB::table('historique')
                ->where('type_action', 'MODIFICATION')
                ->update(['type_action' => 'ASSIGNATION']);

            // 3) Remove the old value from the ENUM
            DB::statement("ALTER TABLE `historique` MODIFY COLUMN `type_action` ENUM('CREATION','ASSIGNATION','TRANSFERT','DEMANDE_AIDE','RESOLUTION','FERMETURE') DEFAULT 'CREATION'");
        } else {
            // SQLite/PostgreSQL or others: just update existing values
            DB::table('historique')
                ->where('type_action', 'MODIFICATION')
                ->update(['type_action' => 'ASSIGNATION']);
        }
    }

    public function down(): void
    {
        $driver = DB::getDriverName();

        if ($driver === 'mysql') {
            // 1) Temporarily allow both values again
            DB::statement("ALTER TABLE `historique` MODIFY COLUMN `type_action` ENUM('CREATION','MODIFICATION','ASSIGNATION','TRANSFERT','DEMANDE_AIDE','RESOLUTION','FERMETURE') DEFAULT 'CREATION'");

            // 2) Revert values back to MODIFICATION
            DB::table('historique')
                ->where('type_action', 'ASSIGNATION')
                ->update(['type_action' => 'MODIFICATION']);

            // 3) Remove ASSIGNATION from the ENUM
            DB::statement("ALTER TABLE `historique` MODIFY COLUMN `type_action` ENUM('CREATION','MODIFICATION','TRANSFERT','DEMANDE_AIDE','RESOLUTION','FERMETURE') DEFAULT 'CREATION'");
        } else {
            DB::table('historique')
                ->where('type_action', 'ASSIGNATION')
                ->update(['type_action' => 'MODIFICATION']);
        }
    }
};


