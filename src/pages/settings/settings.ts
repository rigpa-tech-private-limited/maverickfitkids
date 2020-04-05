import {Component }from '@angular/core'; 
import {Platform, IonicPage, ModalController, NavController, NavParams, AlertController, LoadingController }from 'ionic-angular'; 
import {DataProvider }from '../../providers/data/data'; 
import {Storage }from '@ionic/storage'; 
import {AppConfig }from '../../config/config'; 
import {DocumentViewer, DocumentViewerOptions }from '@ionic-native/document-viewer'; 
import {InAppBrowser, InAppBrowserOptions }from "@ionic-native/in-app-browser"; 

@IonicPage()
@Component( {
selector:'page-settings', 
templateUrl:'settings.html', 
})
export class SettingsPage {
unregisterBackButtonAction:any; 
imgPreview = 'assets/imgs/no_image.png'; 
showMenuIcon:boolean = true; 
showNoAccessMsg:boolean = false; 
userDetails:any; 
responseData:any; 
reviewPath:any; 
redDotVisibleFitFest:boolean = false; 
redDotVisibleFitZone:boolean = false; 
redDotVisibleQuery:boolean = false; 
redDotVisibleReview:boolean = false; 
constructor(private iab:InAppBrowser, public navCtrl:NavController, public modalCtrl:ModalController, 
public platform:Platform, 
public navParams:NavParams, 
public alertCtrl:AlertController, 
public loadingCtrl:LoadingController, 
private document:DocumentViewer, 
public storage:Storage, 
public dataService:DataProvider) {

this.storage.get('userDetails')
.then((res:any) =>  {
if (res) {
this.userDetails = res; 
if (res.areviewFlag == "1") {
this.redDotVisibleReview = true; 
}
if (res.fitFestFlag == "1") {
this.redDotVisibleFitFest = true; 
}
if (res.queryFlag == "1") {
this.redDotVisibleQuery = true; 
}
}
}); 
}


openReviewLink() {
let loader = this.loadingCtrl.create( {
spinner:'ios', 
content:''
}); 
loader.present(); 
this.dataService.getStudent3AReview(this.userDetails).then((result) =>  {
loader.dismiss(); 
this.responseData = result; 
console.log(this.responseData); 
if (this.responseData.returnStatus != 0) {
this.reviewPath = AppConfig.SITE_URL + this.responseData.reviewPath; 
console.log(this.reviewPath); 
const options:InAppBrowserOptions =  {
zoom:'no'
}
const browser = this.iab.create('https://docs.google.com/gview?embedded=true&url=' + this.reviewPath, '_blank', options);
//const browser = this.iab.create(this.reviewPath, '_blank', { location: 'no' });
// const options: DocumentViewerOptions = {
//   title: "3A Review"
// }
// this.document.viewDocument('https://docs.google.com/gview?embedded=true&url=' + this.reviewPath, 'application/pdf', options);
}else if (this.responseData.returnStatus == 0) {
console.log('returnStatus=>0'); 
const alert = this.alertCtrl.create( {
message:this.responseData.returnMessage, 
buttons:[ {
text:'Ok', 
handler:() =>  {
//this.goHome();
}
}], 
enableBackdropDismiss:false
        }); 
alert.present(); 
}
}, (err) =>  {
console.log(err); 
loader.dismiss(); 
const alert = this.alertCtrl.create( {
message:AppConfig.API_ERROR, 
buttons:[ {
text:'Ok', 
handler:() =>  {}
}]
      }); 
alert.present(); 
}); 
}

ionViewDidLoad() {
console.log('HomePage DidLoad-->'); 
this.storage.get('imgPreview')
.then((res:any) =>  {
if (res) {
this.imgPreview = res; 
console.log("Img=>", this.imgPreview); 
let cusid_ele = document.getElementsByClassName('profile-avatar'); 
for (let i = 0; i < cusid_ele.length; ++i) {
let item = cusid_ele[i]; 
item.setAttribute("style", "background-image: url(" + this.imgPreview + ");"); 
}
}
}); 

this.initializeBackButtonCustomHandler(); 
}
openModal(pageName) {

let modal = this.modalCtrl.create(pageName, null,  {
cssClass:'exercise-modal', 
enableBackdropDismiss:true
    }); 
modal.present(); 
}
ionViewWillLeave() {
console.log('HomePage Leave-->'); 
this.unregisterBackButtonAction && this.unregisterBackButtonAction(); 
}

initializeBackButtonCustomHandler():void {
this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() =>  {
console.log('Prevent Back Button Page Change-->'); 
this.goHome(); 
}); 
}

goPage(pmPage) {
this.navCtrl.setRoot(pmPage); 
}


checkNoAccess(pmPage) {
this.storage.get('userDetails')
.then((res:any) =>  {
if (res.studentAccessLevel == "2" || pmPage == 'QueryPage') {
console.log(res.studentAccessLevel); 
this.showMenuIcon = false; 
this.showNoAccessMsg = true; 
setTimeout(() =>  {
this.showMenuIcon = true; 
this.showNoAccessMsg = false; 
console.log(res.studentAccessLevel); 
}, 7000); 

}else {
if (pmPage != '') {
if (pmPage == 'ReviewPage') {
this.openReviewLink(); 
}else {
this.navCtrl.setRoot(pmPage); 
}
}
}
}); 
}

goHome() {
this.navCtrl.setRoot("HomePage"); 
}
}
