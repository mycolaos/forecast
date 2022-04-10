import { RouterModule, Routes } from '@angular/router';

import { HistoryComponent } from './pages/history/history.component';
import { IndexComponent } from './pages/index/index.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'history', component: HistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
