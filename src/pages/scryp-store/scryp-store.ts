import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { BarcodeScanner } from '../../../node_modules/@ionic-native/barcode-scanner';
import { Web3Service } from '../../service/web3.service';

/**
 * Generated class for the ScrypStorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scryp-store',
  templateUrl: 'scryp-store.html',
})
export class ScrypStorePage {

  mapPageObject: any;
  callback: any;
  offer: any;
  scrypActions = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private scanner: BarcodeScanner, private loadingCtrl: LoadingController,
    private web3Service: Web3Service) {
    this.mapPageObject = this.navParams.get('pageObject');
    this.callback = this.navParams.get('callback');
    this.offer = this.navParams.get('offer');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScrypStorePage');
  }
  closeMenu() {
    this.callback(this.mapPageObject).then(()=>{ this.navCtrl.pop() });
  }

  toggleScrypActions() {
    this.scrypActions = !this.scrypActions;
  }

  async spendScryp() {
    const info = await this.scanner.scan();
    const values = info.text.split(';');
    if (values[0] != 'Spend') {
      alert('Invalid code scanned');
      return;
    }
    // scryp spend logic goes here
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    const result = await this.web3Service.burnScryp(values[1]);
    loading.dismiss();
    if (result) {
      alert('Scryp Spent');
    } else {
      alert('Failed');
    }
  }
}
