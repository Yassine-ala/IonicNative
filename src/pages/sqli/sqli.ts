import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';

import {SQLite, SQLiteObject} from "@ionic-native/sqlite";

const DATABASE_FILE_NAME: string = 'data.db';

@IonicPage()
@Component({
  selector: 'page-sqli',
  templateUrl: 'sqli.html',
})

export class SqliPage {

  private db: SQLiteObject;

  movies: string[] = [];
  titleMovie: string;
  ratingMovie: number;
  descriptionMovie: string;
  categorieMovie: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, private alertCtrl: AlertController) {
    this.createDatabaseFile();
  }

  private createDatabaseFile(): void {
    this.sqlite.create({
      name: DATABASE_FILE_NAME,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        console.log('Bdd créée !');
        this.db = db;
        this.createTables();
      })
      .catch(e => console.log(e));
  }

  private createTables(): void {
    this.db.executeSql('CREATE TABLE IF NOT EXISTS `MOVIES` ( `idMovies` INTEGER NOT NULL, `name` TEXT NOT NULL, `eval` INTEGER NOT NULL DEFAULT 3, `desc` TEXT, `categoryId` INTEGER, PRIMARY KEY(`idMovies`), FOREIGN KEY(`categoryId`) REFERENCES idCategories )', {})
      .then(() => {
        console.log('Table Movies created !');

        this.db.executeSql('CREATE TABLE IF NOT EXISTS `CATEGORIES` ( `idCategories` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `name` TEXT NOT NULL )', {})
          .then(() => console.log('Table Categories created !'))
          .catch(e => console.log(e));

      })
      .catch(e => console.log(e));
  }

  saveok() {
    let alert = this.alertCtrl.create({
      title: 'Movie Saved',
      subTitle: 'Movie added successfully !!',
      buttons: ['Ok']
    });
    alert.present();
  }

  delok() {
    let alert = this.alertCtrl.create({
      title: 'Movie deleted',
      subTitle: 'Movie deleted successfully !!',
      buttons: ['Ok']
    });
    alert.present();
  }

  public saveMyFilm() {

    this.db.executeSql('INSERT INTO `CATEGORIES` (name) VALUES(\'' + this.categorieMovie + '\')', {})
      .then(() => {

        this.db.executeSql('INSERT INTO `MOVIES`(name, eval, desc, categoryId) VALUES (\'' + this.titleMovie + '\', '+ this.ratingMovie +', \''+ this.descriptionMovie +'\', last_insert_rowid())', {})
          .then(() => this.saveok())
          .catch(e => console.log(e));
        this.titleMovie="";
        this.descriptionMovie="";
        this.ratingMovie=null;
        this.categorieMovie="";

      })
      .catch(e => console.log(e));
  }

  public retrieveFilms() {

    this.movies = [];
    this.db.executeSql('SELECT name FROM `MOVIES`', {})
      .then((data) => {

        if(data == null) {
          return;
        }

        if(data.rows) {
          if(data.rows.length > 0) {
            for(var i = 0; i < data.rows.length; i++) {
              this.movies.push(data.rows.item(i).name);
            }
          }
        }
      });

  }

  dlf : string="";
  public delFilms(){
    this.db.executeSql('DELETE FROM `MOVIES` WHERE (name=\''+this.dlf+'\')', {})
      .then(() => { this.delok()
      })
    this.dlf="";
      }

}
