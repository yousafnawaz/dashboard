// Copyright 2020 The Kubermatic Kubernetes Platform contributors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {OPAService} from '@core/services/opa';
import {NotificationService} from '@core/services/notification';
import {ConstraintTemplate, ConstraintTemplateSpec} from '@shared/entity/opa';
import {getIconClassForButton} from '@shared/utils/common';
import * as y from 'js-yaml';
import _ from 'lodash';
import {Subject} from 'rxjs';
import {take} from 'rxjs/operators';

export interface ConstraintTemplateDialogConfig {
  title: string;
  mode: Mode;
  confirmLabel: string;

  // Constraint Template has to be specified only if dialog is used in the edit mode.
  constraintTemplate?: ConstraintTemplate;
}

export enum Mode {
  Add = 'add',
  Edit = 'edit',
}

export enum Controls {
  Spec = 'spec',
}

@Component({
  selector: 'km-constraint-template-dialog',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
})
export class ConstraintTemplateDialog implements OnInit, OnDestroy {
  readonly controls = Controls;
  spec = '';
  private readonly _unsubscribe = new Subject<void>();

  constructor(
    private readonly _matDialogRef: MatDialogRef<ConstraintTemplateDialog>,
    private readonly _opaService: OPAService,
    private readonly _notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: ConstraintTemplateDialogConfig
  ) {}

  ngOnInit(): void {
    this._initProviderConfigEditor();
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  isValid(): boolean {
    return !_.isEmpty(this.spec);
  }

  getIconClass(): string {
    return getIconClassForButton(this.data.confirmLabel);
  }

  getCTName(): string {
    return this.data.constraintTemplate.spec.crd.spec.names.kind.toLowerCase();
  }

  save(): void {
    const formSpec = this._getSpec();

    const constraintTemplate: ConstraintTemplate = {
      name: _.get(this._getSpec(), 'crd.spec.names.kind') ? formSpec.crd.spec.names.kind.toLowerCase() : '',
      spec: formSpec,
    };

    switch (this.data.mode) {
      case Mode.Add:
        return this._create(constraintTemplate);
      case Mode.Edit:
        return this._edit(constraintTemplate);
    }
  }

  private _initProviderConfigEditor(): void {
    if (this.data.mode === Mode.Edit) {
      const spec = this.data.constraintTemplate.spec;
      if (!_.isEmpty(spec)) {
        this.spec = y.dump(spec);
      }
    }
  }

  private _getSpec(): ConstraintTemplateSpec {
    let spec = new ConstraintTemplateSpec();
    const raw = y.load(this.spec) as ConstraintTemplateSpec;
    if (!_.isEmpty(raw)) {
      spec = raw;
    }
    return spec;
  }

  private _create(constraintTemplate: ConstraintTemplate): void {
    this._opaService
      .createConstraintTemplate(constraintTemplate)
      .pipe(take(1))
      .subscribe(result => {
        this._matDialogRef.close(true);
        this._notificationService.success(`Created the ${result.name} constraint template`);
        this._opaService.refreshConstraintTemplates();
      });
  }

  private _edit(constraintTemplate: ConstraintTemplate): void {
    this._opaService
      .patchConstraintTemplate(this.data.constraintTemplate.name, constraintTemplate)
      .pipe(take(1))
      .subscribe(result => {
        this._matDialogRef.close(true);
        this._notificationService.success(`Updated the ${result.name} constraint template`);
        this._opaService.refreshConstraintTemplates();
      });
  }
}
