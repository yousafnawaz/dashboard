import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ApiService } from '../../core/services';
import { NotificationActions } from '../../redux/actions/notification.actions';
import { MemberEntity } from '../../shared/entity/MemberEntity';
import { ProjectEntity } from '../../shared/entity/ProjectEntity';

@Component({
  selector: 'kubermatic-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.scss']
})
export class EditMemberComponent implements OnInit {
  @Input() project: ProjectEntity;
  @Input() member: MemberEntity;
  public editMemberForm: FormGroup;

  constructor(private api: ApiService,
              private dialogRef: MatDialogRef<EditMemberComponent>) {
  }

  public ngOnInit(): void {
    this.editMemberForm = new FormGroup({
      group: new FormControl('', [Validators.required]),
    });
  }

  editMember(): void {
    const editMember: MemberEntity = {
      id: this.member.id,
      name: this.member.name,
      email: this.member.email,
      creationTimestamp: this.member.creationTimestamp,
      deletionTimestamp: this.member.deletionTimestamp,
      projects: [
        {
          group: this.editMemberForm.controls.group.value,
          id: this.project.id,
        }
      ]
    };

    this.api.editMembers(this.project.id, editMember).subscribe(res => {
      this.dialogRef.close(true);
      NotificationActions.success('Success', `Member is edited successfully`);
    });
  }
}
