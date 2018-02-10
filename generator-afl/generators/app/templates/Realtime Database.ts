import { Component, OnInit } from '@angular/core';
import { AngularFireLiteDatabase } from 'angularfire-lite';

@Component({
  selector: 'app-<%=cn%>',
  templateUrl: './<%=cn%>.component.html',
  styleUrls: ['./<%=cn%>.component.css']
})
export class <%= cn_camel %>Component implements OnInit {

  databaseList;
  writingData;

  constructor(public db: AngularFireLiteDatabase) {
  }

  ngOnInit() {


    //====================================
    //  Reading From The Realtime Database
    //====================================


    // Realtime Database Read
    this.db.read('YOUR PATH HERE').subscribe((data) => {
    });


    // Realtime Database list retrieval
    this.databaseList = this.db.read('YOUR PATH HERE');


    // Realtime Database query
    this.db.query('YOUR PATH HERE')
      .startAt('Starting Value')
      .limitToLast(1)
      .orderByKey()
      .on('value').subscribe((data) => {

    });

    //====================================
    //  Writing To The Realtime Database
    //====================================

    this.db.write('YOUR PATH HERE', this.writingData); // Saves data to the specified reference, replacing any existing data at that path

    this.db.push('YOUR PATH HERE', this.writingData); // Generates a unique key every time a new child is added to the specified reference with the data provided

    this.db.update('YOUR PATH HERE', this.writingData); // This updates the provided path with the data given

  }

}
