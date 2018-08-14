<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEstablishmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('estabelecimentos', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_subcategoria', false, true)->length(11);
            $table->integer('id_endereco', false, true)->length(11);
            $table->string('nome', 60);
            $table->string('desc', 60);
            $table->string('facebook', 60);
            $table->string('instagram', 60);
            $table->string('email', 60);
            $table->string('imagem', 60);
            $table->timestamps();
            $table->softDeletes();
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('estabelecimentos');
    }
}
