import { NgModule } from "@angular/core";
import { USER_DATABASE, userDatabaseValue } from "./databases/user-data.mock";
import { APP_DATABASE, appDatabaseValue } from "./databases/appointments.mock";
import {MatIconModule} from '@angular/material/icon';
import { NavbarComponent } from "./navbar/navbar.component";
import { CommonModule } from "@angular/common";
import { StatCardComponent } from './stat-card/stat-card.component';
import { StatCardModule } from "./stat-card/stat-card.module";
import { MainComponent } from './layouts/main/main.component';
import { RouterOutlet } from "@angular/router";
import { StatSideComponent } from './layouts/stat-side/stat-side.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ScheduleComponent } from './layouts/schedule/schedule.component';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations:[
        NavbarComponent,
        MainComponent,
        StatSideComponent,
        DashboardComponent,
        CalendarComponent,
        ScheduleComponent,
    ],
    imports:[
        MatIconModule,
        CommonModule,
        StatCardModule,
        RouterOutlet,
        ReactiveFormsModule
    ],
    exports:[
        NavbarComponent,
        MainComponent,
        DashboardComponent,
        StatSideComponent,
        CalendarComponent,
        ScheduleComponent,
        StatCardComponent
    ],
    providers:[
        {
            provide: USER_DATABASE,
            useValue: userDatabaseValue
        },
        {
            provide: APP_DATABASE,
            useValue: appDatabaseValue
        }
    ]
})

export class SharedModule{}