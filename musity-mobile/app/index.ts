import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { TNSSpotifyConstants, TNSSpotifyAuth } from 'nativescript-spotify';
import * as application from 'application';
import { isAndroid, isIOS } from 'platform';
import { AppModule } from './src/app.module';
import { enableProdMode } from '@angular/core';

TNSSpotifyConstants.CLIENT_ID = '5f7aa6a60c6f4e569c8df681f6f5964c';
TNSSpotifyAuth.REDIRECT_URL = 'tnsspotify://spotifylogin';

enableProdMode();
platformNativeScriptDynamic().bootstrapModule(AppModule);
