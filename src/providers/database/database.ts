import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

@Injectable()
export class DatabaseProvider {
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;

  constructor(public sqlitePorter: SQLitePorter, private storage: Storage, private sqlite: SQLite, private platform: Platform, private http: Http) {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'maverick.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.storage.get('db_dump').then(val => {
            if (val) {
              this.databaseReady.next(true);
            } else {
              this.fillDatabase();
            }
          });
        });
    });
  }

  fillDatabase() {
    this.http.get('assets/maverickdb.sql')
      .map(res => res.text())
      .subscribe(sql => {
        console.log(sql);
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(data => {
            this.databaseReady.next(true);
            this.storage.set('db_dump', true);
          })
          .catch(e => console.error(e));
      });
  }

  getDatabaseState() {
    return this.databaseReady.asObservable();
  }

  addUser(userDetails) {
    let data = [userDetails.academicYear, userDetails.areviewFlag, userDetails.audioPath, userDetails.classCode, userDetails.className, userDetails.coachFlag, userDetails.dob, userDetails.fitFestFlag, userDetails.fitzoneFlag, userDetails.skillFlag, userDetails.gender, userDetails.mailId, userDetails.mobile, userDetails.passwordChanged, userDetails.prqStatus, userDetails.queryFlag, userDetails.registeredDate, userDetails.returnMessage, userDetails.returnStatus, userDetails.schoolCode, userDetails.schoolName, userDetails.sectionName, userDetails.studentAccessLevel, userDetails.studentAge, userDetails.studentId, userDetails.studentImage, userDetails.studentName, "1", userDetails.password, userDetails.starCount, "","1"];
    return this.database.executeSql("INSERT INTO users (academicYear,areviewFlag,audioPath,classCode,className,coachFlag,dob,fitFestFlag,fitzoneFlag,skillFlag,gender,mailId,mobile,passwordChanged,prqStatus,queryFlag,registeredDate,returnMessage,returnStatus,schoolCode,schoolName,sectionName,studentAccessLevel,studentAge,studentId,studentImage,studentName,status,password,starcount,playlist,lockStatus) VALUES (?,?,?,?,?, ?,?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  addUserImage(userId, userImg) {
    let data = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", userId, userImg, "", "1", userId, "0", "","0"];
    return this.database.executeSql("INSERT INTO users (academicYear,areviewFlag,audioPath,classCode,className,coachFlag,dob,fitFestFlag,fitzoneFlag,skillFlag,gender,mailId,mobile,passwordChanged,prqStatus,queryFlag,registeredDate,returnMessage,returnStatus,schoolCode,schoolName,sectionName,studentAccessLevel,studentAge,studentId,studentImage,studentName,status,password,starcount,playlist,lockStatus) VALUES (?,?,?,?,?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  updateUser(userDetails) {
    let data = [userDetails.academicYear, userDetails.areviewFlag, userDetails.audioPath, userDetails.classCode, userDetails.className, userDetails.coachFlag, userDetails.dob, userDetails.fitFestFlag, userDetails.fitzoneFlag, userDetails.skillFlag, userDetails.gender, userDetails.mailId, userDetails.mobile, userDetails.passwordChanged, userDetails.prqStatus, userDetails.queryFlag, userDetails.registeredDate, userDetails.returnMessage, userDetails.returnStatus, userDetails.schoolCode, userDetails.schoolName, userDetails.sectionName, userDetails.studentAccessLevel, userDetails.studentAge, userDetails.studentId, userDetails.studentName, "1", userDetails.password, userDetails.starCount, "","1", userDetails.studentId];
    return this.database.executeSql("UPDATE users SET academicYear=?,areviewFlag=?,audioPath=?,classCode=?,className=?,coachFlag=?,dob=?,fitFestFlag=?,fitzoneFlag=?,skillFlag=?,gender=?,mailId=?,mobile=?,passwordChanged=?,prqStatus=?,queryFlag=?,registeredDate=?,returnMessage=?,returnStatus=?,schoolCode=?,schoolName=?,sectionName=?,studentAccessLevel=?,studentAge=?,studentId=?,studentName=?,status=?,password=?,starcount=?,playlist=?,lockStatus=? WHERE studentId=?", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  getUserDetails() {
    return this.database.executeSql("SELECT DISTINCT * FROM users WHERE studentName!=''", []).then((data) => {
      let users = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          users.push({ studentName: data.rows.item(i).studentName, studentId: data.rows.item(i).studentId, studentImage: data.rows.item(i).studentImage, studentAccessLevel: data.rows.item(i).studentAccessLevel, status: data.rows.item(i).status, password: data.rows.item(i).password, starcount: data.rows.item(i).starcount, lockStatus: data.rows.item(i).lockStatus });
        }
      }
      return users;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }


  deleteUsers() {
    return this.database.executeSql('DELETE FROM users', []).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  updateUserStatus(id, status) {
    let data = [status, id];
    console.log(data);
    return this.database.executeSql("UPDATE users SET status=? WHERE studentId=?", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  updateUserLockStatus(id, status) {
    let data = [status, id];
    console.log(data);
    return this.database.executeSql("UPDATE users SET lockStatus=? WHERE studentId=?", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  updateOtherUserLockStatus(id) {
    let data = ['0', id];
    console.log(data);
    return this.database.executeSql("UPDATE users SET lockStatus=? WHERE studentId!=?", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  updateUserStars(id, status) {
    let data = [status, id];
    console.log(data);
    return this.database.executeSql("UPDATE users SET starcount=? WHERE studentId=?", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  updateUserSportSkills(id, skillFlag) {
    let data = [skillFlag, id];
    console.log(data);
    return this.database.executeSql("UPDATE users SET skillFlag=? WHERE studentId=?", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  updateUserPassword(id, password) {
    let data = [password, id];
    console.log(data);
    return this.database.executeSql("UPDATE users SET password=? WHERE studentId=?", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }


  deleteUsersById(pmstudentId) {
    return this.database.executeSql('DELETE FROM users WHERE studentId=?', [pmstudentId]).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  selectUserById(pmstudentId) {
    return this.database.executeSql("SELECT * FROM users WHERE studentId=?", [pmstudentId]).then((data) => {
      let users = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          users.push({
            academicYear: data.rows.item(i).academicYear,
            areviewFlag: data.rows.item(i).areviewFlag,
            audioPath: data.rows.item(i).audioPath,
            classCode: data.rows.item(i).classCode,
            className: data.rows.item(i).className,
            coachFlag: data.rows.item(i).coachFlag,
            dob: data.rows.item(i).dob,
            fitFestFlag: data.rows.item(i).fitFestFlag,
            fitzoneFlag: data.rows.item(i).fitzoneFlag,
            skillFlag: data.rows.item(i).skillFlag,
            gender: data.rows.item(i).gender,
            mailId: data.rows.item(i).mailId,
            mobile: data.rows.item(i).mobile,
            password: data.rows.item(i).password,
            passwordChanged: data.rows.item(i).passwordChanged,
            prqStatus: data.rows.item(i).prqStatus,
            queryFlag: data.rows.item(i).queryFlag,
            registeredDate: data.rows.item(i).registeredDate,
            returnMessage: data.rows.item(i).returnMessage,
            returnStatus: data.rows.item(i).returnStatus,
            schoolCode: data.rows.item(i).schoolCode,
            schoolName: data.rows.item(i).schoolName,
            sectionName: data.rows.item(i).sectionName,
            studentAccessLevel: data.rows.item(i).studentAccessLevel,
            studentAge: data.rows.item(i).studentAge,
            studentId: data.rows.item(i).studentId,
            studentImage: data.rows.item(i).studentImage,
            studentName: data.rows.item(i).studentName,
            status: data.rows.item(i).status,
            playlist: data.rows.item(i).playlist,
            lockStatus: data.rows.item(i).lockStatus
          });
        }
      }
      return users;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  updateUserImage(id, studentImage) {
    let data = [studentImage, id];
    console.log(data);
    return this.database.executeSql("UPDATE users SET studentImage=? WHERE studentId=?", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  updateUserPlaylist(id, studentMusic) {
    let data = [studentMusic, id];
    console.log(data);
    return this.database.executeSql("UPDATE users SET playlist=? WHERE studentId=?", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  getVerifiedUser(username, password) {
    return this.database.executeSql("SELECT * FROM users WHERE studentName=? AND  password=?", [username, password]).then((data) => {
      let users = [];
      console.log('data: ', data.rows.length);
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          users.push({ id: data.rows.item(i).id, studentName: data.rows.item(i).studentName });
        }
      }
      return users;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

}
