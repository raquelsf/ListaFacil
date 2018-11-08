import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()

export class DbProvider {
  public data_info: any = [{ }]
  public database_schema =
    `
      CREATE TABLE IF NOT EXISTS tb_user(
        email TEXT NOT NULL,
        password TEXT NOT NULL
      )
    `
  public database: SQLiteObject;
  constructor(public http: HttpClient, private sqlite: SQLite) { }

  getInstanceSQLite(){
    return this.sqlite.create({
      name: 'listafacil.db',
      location: 'default'
    })
  }

  createDatabase(){
    this.getInstanceSQLite()
      .then((db: SQLiteObject) => {
        this.database = db;
        db.executeSql(this.database_schema, [])
          .then(() => console.log('Tabela e banco criados.'))
          .catch(e => console.log(e));
      })
      .catch(e => console.log('Erro ao criar bd',e));
  }

  insertDbValues(data){
    console.log(data);
    this.getInstanceSQLite()
    .then(()=>{
      this.database.executeSql('INSERT INTO tb_user(email,password) VALUES(?,?);', [data.email, data.password])
      .then(() => console.log('Dados inseridos.'))
      .catch(e => console.log('Erro ao inserir', e))
    }).catch(e => console.log('Erro ao abrir bd', e));
  }

  deleteDbValues(){
    this.getInstanceSQLite()
    .then(() => {
      this.database.executeSql('DELETE FROM tb_user', [])
      console.log('Dados excluídos!')
    }).catch(e => console.log('Erro ao excluir SQL', e));
  }

  setData(data){
    this.data_info = data;
  }
  getData(){
    return this.data_info;
  }
  deleteData() {
    this.data_info = '';
  }

}