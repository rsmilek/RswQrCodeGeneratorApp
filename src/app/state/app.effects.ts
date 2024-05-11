import { Injectable } from "@angular/core";
import { catchError, concatMap, filter, map, of, tap } from "rxjs";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ROUTER_NAVIGATION, RouterNavigatedAction } from "@ngrx/router-store";

import { AppPageActions, ApiActions } from "./app.actions";
import { isRouteQrCodeUrl } from "../app-routing.module";
import { DarkModeService } from "../services/dark-mode.service";
import { QrCodeGeneratorApiService } from "../services/qr-code-generator-api.service";
import { ImageService } from "../services/image.service";

@Injectable()
export class AppEffects {

    onToggleDarkMode$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppPageActions.toggleDarkMode),
            tap(() => this.darkModeService.isDarkMode = !this.darkModeService.isDarkMode)
        ),
        { dispatch: false } //<-- Oh no, don't leave this out! Otherwise app frozen...
    );

    onSetDarkMode$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppPageActions.setDarkMode),
            tap(x => this.darkModeService.isDarkMode = x.isDarkMode)
        ),
        { dispatch: false } //<-- Oh no, don't leave this out! Otherwise app frozen...
    );

    onQrCodeRouterNavigated$ = createEffect(() =>
        this.actions$.pipe(
            ofType<RouterNavigatedAction>(ROUTER_NAVIGATION),
            filter((action) => isRouteQrCodeUrl(action.payload.routerState.url)),
            map(() => AppPageActions.qRCodeRouterNavigated())
        )
    );

    onDownloadQrCodeBlob$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AppPageActions.downloadQRCodeBlobBegin),
            // Creates QR code download link and trigger a click event
            tap(({ blob, fileName, element }) => 
                this.imageService.downloadBlobFromLink(blob, fileName, element)),
            // Simulation of QR code downloadig progress
            concatMap(({ period }) => 
                this.imageService.delay(period).pipe(
                    map(() => AppPageActions.downloadQRCodeBlobEnd())
                )
            )
        )
    );

    onUrlQrCodeBlob$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ApiActions.generateUrlQRCodeBlob),
            concatMap(({ urlDTO }) =>
                this.apiService.postQrCodeUrl(urlDTO).pipe(
                    map((qrCodeBlob) => ApiActions.qRCodeBlobGenerationSuccess({ qrCodeBlob })),
                    catchError((generatingQrCodeError) => of(ApiActions.qRCodeBlobGenerationFail({ generatingQrCodeError })))
                )
            )
        )
    );

    onEmailQrCodeBlob$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ApiActions.generateEmailQRCodeBlob),
            concatMap(({ emailDTO }) =>
                this.apiService.postQrCodeEmail(emailDTO).pipe(
                    map((qrCodeBlob) => ApiActions.qRCodeBlobGenerationSuccess({ qrCodeBlob })),
                    catchError((generatingQrCodeError) => of(ApiActions.qRCodeBlobGenerationFail({ generatingQrCodeError })))
                )
            )
        )
    );

    onCzPaymentQrCodeBlob$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ApiActions.generateCZPaymentQRCodeBlob),
            concatMap(({ czPaymentDTO }) =>
                this.apiService.postQrCodeCzPayment(czPaymentDTO).pipe(
                    map((qrCodeBlob) => ApiActions.qRCodeBlobGenerationSuccess({ qrCodeBlob })),
                    catchError((generatingQrCodeError) => of(ApiActions.qRCodeBlobGenerationFail({ generatingQrCodeError })))
                )
            )
        )
    );

    onQrCodeBlobToData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ApiActions.qRCodeBlobGenerationSuccess),
            concatMap(({ qrCodeBlob }) =>
                this.imageService.blobToData(qrCodeBlob).pipe(
                    map((qrCodeData) => AppPageActions.qRCodeBlobToData({ qrCodeData }))
                )
            )
        )
    );

    constructor(
        private actions$: Actions, 
        private darkModeService: DarkModeService,
        private apiService: QrCodeGeneratorApiService,
        private imageService: ImageService
    ) { }
}