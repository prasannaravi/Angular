import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DatatableComponent } from './datatable/datatable.component';
import { DynamicFilterComponent } from './dynamic-filter/dynamic-filter.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppLayoutModule } from './app-layout/app-layout.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormlyModule } from '@ngx-formly/core';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { FormlyExtensionModule } from '../formly-extension/formly-extension.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormlyMatCheckboxModule } from '@ngx-formly/material/checkbox';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { FormlyMatInputModule } from '@ngx-formly/material/input';
import { FormlyMatSelectModule } from '@ngx-formly/material/select';
import { FormlyMatRadioModule } from '@ngx-formly/material/radio';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormlyMatFormFieldModule } from '@ngx-formly/material/form-field';
import { FormlyMatTextAreaModule } from '@ngx-formly/material/textarea';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../services/token.interceptor';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { ActionButtonComponent } from './datatable/button';
import { IncidentComponent } from './incident/incident.component';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { NgxChartsModule } from "@swimlane/ngx-charts";



const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

const appearance: any = {
  appearance: 'outline'
};

@NgModule({
  declarations: [
    DashboardComponent,
    DatatableComponent,
    DynamicFilterComponent,
    DynamicFormComponent,
    ActionButtonComponent,
    IncidentComponent
  ],
  imports: [
    CommonModule,
    NgxChartsModule,
    FormlyMatToggleModule,
    BrowserModule,
    AgGridModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    AppLayoutModule,
    AuthenticationModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyMatCheckboxModule,
    FormlyMatDatepickerModule,
    FormlyMatInputModule,
    FormlyMatRadioModule,
    FormlyMatSelectModule,
    FormlyMaterialModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSelectModule,
    FormlyMatFormFieldModule,
    FormlyMatTextAreaModule,
    MatNativeDateModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    // PrimeIcons,
    MatTabsModule,
    MatDatepickerModule,
    FormlyExtensionModule,
    MatSidenavModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' }]
    }),
    MatExpansionModule

  ],


  exports: [
    DashboardComponent,
    DatatableComponent,
    DynamicFilterComponent,
    DynamicFormComponent,
    IncidentComponent,
    FormlyExtensionModule
  ],

  providers: [
    DatePipe,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
})
export class ComponentModule { }
