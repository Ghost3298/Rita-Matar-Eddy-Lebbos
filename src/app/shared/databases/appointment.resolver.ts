import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot } from "@angular/router";
import { AppDataOperations } from "./appointments.operations";

@Injectable({
    providedIn: 'root'
})

export class ApppointmentResolver implements Resolve<any[]>{
    constructor(
        private appDataOps: AppDataOperations
    ){}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<any[] | RedirectCommand> {
        return this.appDataOps.getAppointments();
    }
    
}