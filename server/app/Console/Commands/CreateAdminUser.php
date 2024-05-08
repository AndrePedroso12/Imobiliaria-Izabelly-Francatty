<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class CreateAdminUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:create-admin-user {param1} {param2}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $param1 = $this->argument('param1');
        $param2 = $this->argument('param2');

        $user = User::create([
            'name' => $param1,
            'email' => $param1,
            'password' => $param2,
            'admin' => 1
        ]);

        $this->info("Usuário administrador criado com sucesso!\n");
        $this->info("login: $user->email\n");
        $this->info("senha: $user->password\n");
    }
}
