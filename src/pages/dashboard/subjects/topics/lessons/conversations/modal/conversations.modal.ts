import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select} from '@angular-redux/store';
import {Observable, Subscription} from 'rxjs';
import {BaseModal} from '../../../../../../../system/classes/base-modal';
import {PopupInterface} from '../../../../../../../system/interfaces/state/dashboard.interface';
import {ConversationService} from '../../../../../../../system/services/conversation.service';
import {CONVERSATION} from '../../../../../../../system/constants/static-content';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'plm-dashboard-lessons-modal',
  templateUrl: './conversations.modal.html'
})
export class ConversationsModal extends BaseModal implements OnInit, OnDestroy {
  @select(['dashboard', 'popupData']) popupData$: Observable<PopupInterface>;
  @select(['dashboard', 'selectedLesson']) selectedLesson$: Observable<any>;
  $selectedLesson$: Subscription;
  $popupData$: Subscription;
  popupData: PopupInterface;
  selectedLesson: any;
  messageForm: FormGroup;
  questionForm: FormGroup;
  imageForm: FormGroup;
  showLoader = false;
  isDelete;
  btnClass;
  type = 'message';
  editor = ClassicEditor;
  editorData = '';
  editorConfig = {
    toolbar: {
      items: [
        'bold',
        'italic',
        'NumberedList',
        'BulletedList',
        'Link',
        'Blockquote',
        'Table',
        '|',
        'undo',
        'redo'
      ],

      viewportTopOffset: 30
    }
  };
  ckeConfig: any;
  file;

  constructor(
    public _ngbModal: NgbActiveModal,
    private _fb: FormBuilder,
    private _conversation: ConversationService
  ) {
    super(_ngbModal);
  }

  async ngOnInit() {
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true
    };
    this.messageForm = this._fb.group({
      message: this._fb.group({
        content: ['', Validators.required]
      }),
      type: ['message']
    });
    this.questionForm = this._fb.group({
      type: ['question'],
      question: this._fb.group({
        question: ['', Validators.required],
        option1: ['', Validators.required],
        option2: ['', Validators.required],
        option3: ['', Validators.required],
        option4: ['', Validators.required],
        answer: ['', Validators.required],
        failureMessage: ['', Validators.required],
        successMessage: ['', Validators.required]
      })
    });
    this.imageForm = this._fb.group({
      content: ['', Validators.required],
      caption: ['', Validators.required]
    });
    this.$popupData$ = this.popupData$.subscribe((data) => {
      this.popupData = data;
      this.isDelete = this.popupData.data && this.popupData.title === `Delete ${CONVERSATION}`;
      this.btnClass = {
        'btn-danger': this.isDelete,
        'btn-primary': !this.isDelete
      };
      this.type = (data && data.data && data.data.type) || 'message';
      if (this.type === 'message') {
        this.editorData = this.popupData.data && this.popupData.data.message || '';
        this.message.get('content').patchValue(this.editorData);
      } else if (this.type === 'question') {
        this.question.setValue({...this.popupData.data.question, ...{answer: this.getAnswer(this.popupData.data.question)}});
      } else if (this.type === 'image') {
        this.content.clearValidators();
        this.caption.setValue(this.popupData.data.image.caption);
      }
    });
    this.$selectedLesson$ = this.selectedLesson$.subscribe((data) => {
      this.selectedLesson = data;
    });
  }

  get message() {
    return this.messageForm.get('message');
  }

  get question() {
    return this.questionForm.get('question');
  }

  get caption() {
    return this.imageForm.get('caption');
  }

  get content() {
    return this.imageForm.get('content');
  }

  editorOnChange({ editor }: ChangeEvent) {
    const messageContent = this.message.get('content');
    this.editorData = editor.getData();
    messageContent.patchValue(this.editorData);
  }

  getAnswer(quest) {
    const options = {
      a: quest.option1,
      b: quest.option2,
      c: quest.option3,
      d: quest.option4
    };
    return Object.keys(options).find(key => options[key] === quest.answer);
  }

  createConversation() {
    if (this.messageForm.valid || this.questionForm.valid || this.imageForm.valid) {
      this.showLoader = true;
      let data;
      let type = null;
      if (this.type === 'message') {
        const messageArr = [];
        let messages = this.message.value.content.split('</p>');
        const regex = /^\s+$/;
        messages = messages.filter(message => {
          return !(!message || message.match(regex));
        });
        messages.forEach(message => {
          message = message + '</p>';
          const obj = {message, type: 'message'};
          messageArr.push(obj);
        });
        data = messageArr;
      } else if (this.type === 'question') {
        const quest = this.question.value;
        const options = {
          a: quest.option1,
          b: quest.option2,
          c: quest.option3,
          d: quest.option4
        };
        const answer = options[quest.answer];
        const question = {...quest, ...{answer}};
        data = {question, type: 'question'};
      } else if (this.type === 'image') {
        data = this.createImage();
        type = 'image';
      }
      this._conversation.createConversation(this.selectedLesson._id, data, type).finally(() => {
        this.showLoader = false;
        this.closeModal();
      });
    }
  }

  editConversation() {
    if (this.messageForm.valid || this.questionForm.valid || this.imageForm.valid) {
      this.showLoader = true;
      let data;
      let type = null;
      if (this.type === 'message') {
        data = {type: 'message', message: this.editorData};
      } else if (this.type === 'question') {
        const quest = this.question.value;
        const options = {
          a: quest.option1,
          b: quest.option2,
          c: quest.option3,
          d: quest.option4
        };
        const answer = options[quest.answer];
        const question = {...quest, ...{answer}};
        data = {question, type: 'question'};
      } else if (this.type === 'image') {
        data = this.createImage();
        type = 'image';
      }
      this._conversation.editConversation(this.selectedLesson._id, this.popupData.data._id, data, type).finally(() => {
        this.showLoader = false;
        this.closeModal();
      });
    }
  }

  createImage() {
    const content = new FormData();
    content.append('file', this.file);
    content.append('caption', this.caption.value);
    return content;
  }

  deleteConversation() {
    this.showLoader = true;
    this._conversation.deleteConversation(this.selectedLesson._id, this.popupData.data._id).finally(() => {
      this.showLoader = false;
      this.closeModal();
    });
  }

  action() {
    switch (this.popupData.title) {
      case `Create ${CONVERSATION}`:
        this.createConversation();
        break;
      case `Edit ${CONVERSATION}`:
        this.editConversation();
        break;
      case `Delete ${CONVERSATION}`:
        this.deleteConversation();
        break;
    }
  }

  ngOnDestroy() {
    this.$popupData$.unsubscribe();
    this.$selectedLesson$.unsubscribe();
  }
}
