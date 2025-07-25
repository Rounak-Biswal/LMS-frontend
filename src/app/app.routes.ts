import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Leaves } from './leaves/leaves';
import { Extra } from './extra/extra';
import { MyLeaves } from './my-leaves/my-leaves';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full"
    },
    {
        path: "dashboard",
        component: Dashboard
    },
    {
        path: "leaves",
        component: MyLeaves
    },
    {
        path: "extra",
        component: Extra
    }
];
