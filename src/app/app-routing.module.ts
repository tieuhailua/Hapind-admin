import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { RoleGuardService } from './auth/role-guard.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/authentication/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'reset',
    loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule),
  },
  {
    path: 'mod',
    loadChildren: () => import('./mod/mod.module').then(m => m.ModModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/authentication/register/register.module').then(m => m.RegisterModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/authentication/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
  },
  {
    path: 'coming-soon',
    loadChildren: () => import('./pages/coming-soon/coming-soon.module').then(m => m.ComingSoonModule),
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'dashboard',
        //loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        loadChildren: () => import('./pages/blank/blank.module').then(m => m.BlankModule),
        pathMatch: 'full',
        // canActivate: [RoleGuardService],
        // data: {
        //   expectedRole: 'admin'
        // }
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        canActivate: [RoleGuardService],
        data: {
          expectedRole: 'admin'
        }
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [RoleGuardService],
        data: {
          expectedRole: 'admin'
        }
      },
      {
        path: 'report',
        loadChildren: () => import('./report/report.module').then(m => m.ReportModule),
        canActivate: [RoleGuardService],
        data: {
          expectedRole: 'admin',
        }
      },
      {
        path: 'censorship',
        loadChildren: () => import('./censorship/censorship.module').then(m => m.CensorshipModule),
      },
      {
        path: 'family',
        loadChildren: () => import('./family/family.module').then(m => m.FamilyModule),
        canActivate: [RoleGuardService],
        data: {
          expectedRole: 'admin'
        }
      },

      {
        path: 'music',
        loadChildren: () => import('./music/music.module').then(m => m.MusicModule), canActivate: [RoleGuardService],
        data: {
          expectedRole: 'admin'
        }
      },
      {
        path: 'drinking',
        loadChildren: () => import('./drinking/drinking.module').then(m => m.DrinkingModule), canActivate: [RoleGuardService],
        data: {
          expectedRole: 'admin'
        }
      },
      {
        path: 'work',
        loadChildren: () => import('./work/work.module').then(m => m.WorkModule), canActivate: [RoleGuardService],
        data: {
          expectedRole: 'admin'
        }
      },
      {
        path: 'status',
        loadChildren: () => import('./status/status.module').then(m => m.StatusModule), canActivate: [RoleGuardService],
        data: {
          expectedRole: 'admin'
        }
      },
      {
        path: 'smoking',
        loadChildren: () => import('./smoking/smoking.module').then(m => m.SmokingModule), canActivate: [RoleGuardService],
        data: {
          expectedRole: 'admin'
        }
      },
      {
        path: 'purpose',
        loadChildren: () => import('./purpose/purpose.module').then(m => m.PurposeModule), canActivate: [RoleGuardService],
        data: {
          expectedRole: 'admin'
        }
      },
      {
        path: 'literacy',
        loadChildren: () => import('./literacy/literacy.module').then(m => m.LiteracyModule), canActivate: [RoleGuardService],
        data: {
          expectedRole: 'admin'
        }
      },
      {
        path: 'habit',
        loadChildren: () => import('./habit/habit.module').then(m => m.HabitModule), canActivate: [RoleGuardService],
        data: {
          expectedRole: 'admin'
        }
      },
      {
        path: 'reason',
        loadChildren: () => import('./reason/reason.module').then(m => m.ReasonModule), canActivate: [RoleGuardService],
        data: {
          expectedRole: 'admin'
        }
      },
      {
        path: 'exercise',
        loadChildren: () => import('./exercise/exercise.module').then(m => m.ExerciseModule), canActivate: [RoleGuardService],
        data: {
          expectedRole: 'admin'
        }
      },
      {
        path: 'expecting',
        loadChildren: () => import('./expecting/expecting.module').then(m => m.ExpectingModule), canActivate: [RoleGuardService],
        data: {
          expectedRole: 'admin'
        }
      },
      {
        path: 'hobby',
        loadChildren: () => import('./hobby/hobby.module').then(m => m.HobbyModule), canActivate: [RoleGuardService],
        data: {
          expectedRole: 'admin'
        }
      },
      {
        path: 'pet',
        loadChildren: () => import('./pet/pet.module').then(m => m.PetModule), canActivate: [RoleGuardService],
        data: {
          expectedRole: 'admin'
        }
      },
      {
        path: 'singer',
        loadChildren: () => import('./singer/singer.module').then(m => m.SingerModule), canActivate: [RoleGuardService],
        data: {
          expectedRole: 'admin'
        }
      },
      // {
      //   path: 'apps/inbox',
      //   loadChildren: () => import('./pages/apps/inbox/inbox.module').then(m => m.InboxModule),
      // },
      // {
      //   path: 'apps/calendar',
      //   loadChildren: () => import('./pages/apps/calendar/calendar.module').then(m => m.CalendarAppModule),
      // },
      // {
      //   path: 'apps/chat',
      //   loadChildren: () => import('./pages/apps/chat/chat.module').then(m => m.ChatModule),
      // },
      // {
      //   path: 'components',
      //   loadChildren: () => import('./pages/components/components.module').then(m => m.ComponentsModule),
      // },
      // {
      //   path: 'forms/form-elements',
      //   loadChildren: () => import('./pages/forms/form-elements/form-elements.module').then(m => m.FormElementsModule),
      // },
      // {
      //   path: 'forms/form-wizard',
      //   loadChildren: () => import('./pages/forms/form-wizard/form-wizard.module').then(m => m.FormWizardModule),
      // },
      // {
      //   path: 'icons',
      //   loadChildren: () => import('./pages/icons/icons.module').then(m => m.IconsModule),
      // },
      // {
      //   path: 'page-layouts',
      //   loadChildren: () => import('./pages/page-layouts/page-layouts.module').then(m => m.PageLayoutsModule),
      // },
      // {
      //   path: 'tables/all-in-one-table',
      //   loadChildren: () => import('./pages/tables/all-in-one-table/all-in-one-table.module').then(m => m.AllInOneTableModule),
      // },
      // {
      //   path: 'drag-and-drop',
      //   loadChildren: () => import('./pages/drag-and-drop/drag-and-drop.module').then(m => m.DragAndDropModule)
      // },
      {
        path: 'editor',
        loadChildren: () => import('./pages/editor/editor.module').then(m => m.EditorModule),
      },
      {
        path: 'blank',
        loadChildren: () => import('./pages/blank/blank.module').then(m => m.BlankModule),
        // canActivate: [RoleGuardService],
        // data: {
        //   expectedRole: 'admin'
        // }
      },
      // {
      //   path: 'level1/level2/level3/level4/level5',
      //   loadChildren: () => import('./pages/level5/level5.module').then(m => m.Level5Module),
      // },
      { path: '**', loadChildren: () => import('./pages/blank/blank.module').then(m => m.BlankModule), }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledNonBlocking',
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
