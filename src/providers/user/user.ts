import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()

export class UserProvider {
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

  setUser(data){
    this.data_info = data;
  }

  getUser(){
    return this.data_info; 
  }
}