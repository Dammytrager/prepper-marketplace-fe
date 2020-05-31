import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {Observable, Subscription} from 'rxjs';
import {DashboardHeaderInterface} from '../../../../../../components/dashboard-header/dashboard-header.interface';
import {SubheaderInterface} from '../../../../../../components/subheader/subheader.interface';
import {PopupInterface} from '../../../../../../system/interfaces/state/dashboard.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {ConversationService} from '../../../../../../system/services/conversation.service';
import {ModalService} from '../../../../../../system/services/modal.service';
import {AppState} from '../../../../../../system/interfaces/state/plm.interface';
import {DASHBOARD} from '../../../../../../system/state/actions/dashboard.action';
import {CONVERSATION} from '../../../../../../system/constants/static-content';
import {ConversationsModal} from './modal/conversations.modal';

@Component({
  selector: 'plm-dashboard-coursepacks-conversations',
  templateUrl: './conversations.html'
})
export class Conversations implements OnInit, OnDestroy {
  @select(['dashboard', 'conversations']) conversations$: Observable<any>;
  @select(['dashboard', 'conversationsLength']) conversationsLength$: Observable<any>;
  @select(['dashboard', 'selectedLesson']) selectedLesson$: Observable<any>;
  $conversations$: Subscription;
  $conversationsLength$: Subscription;
  $selectedLesson$: Subscription;
  conversations = [];
  conversationsLength;
  selectedLesson;
  dashboardHeaderdata: DashboardHeaderInterface = {
    bigHeader: 'Creative Thinking',
    smallHeader: 'Conversations',
    bgColor: 'white',
    additionalContent: false
  };
  subheaderData: SubheaderInterface = {
    title: {
      text: 'Conversations'
    },
    action: {
      text: 'Add conversation',
      color: 'primary',
      icon: ['fas', 'plus']
    }
  };
  showLoading = false;
  popupData: PopupInterface;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _conversation: ConversationService,
    private _modal: ModalService,
    private _ngRedux: NgRedux<AppState>
  ) {
    this.getConversations().then(() => {
      this.showLoading = false;
    });
  }

  ngOnInit() {
    this.$conversations$ = this.conversations$.subscribe((data: any) => {
      this.conversations = data;
    });
    this.$conversationsLength$ = this.conversationsLength$.subscribe((data: any) => {
      this.conversationsLength = data;
      this.subheaderData.title.text = `Conversations`;
      this.dashboardHeaderdata.smallHeader = `Conversations`;
    });
    this.$selectedLesson$ = this.selectedLesson$.subscribe((data: any) => {
      this.selectedLesson = data;
      this.dashboardHeaderdata = {
        bigHeader: data && data.name || null,
        smallHeader: data && data.conversations ? `Conversations` : null,
        bgColor: 'white',
        additionalContent: true
      };
      this.subheaderData.title.text = data && data.conversations ? `Conversations` : 'Conversations';
    });
  }

  getConversations() {
    const lessonId = this._route.snapshot.paramMap.get('id');
    return this._conversation.getConversations(lessonId);
  }

  addConversation() {
    this.popupData = {
      title: `Create ${CONVERSATION}`,
      button: 'Create',
    };
    this._ngRedux.dispatch({type: DASHBOARD.CHANGE_POPUP_DATA, popupData: this.popupData});
    this._modal.openModal(ConversationsModal, {size: 'lg', centered: true});
  }

  editConversation(conversation) {
    this.popupData = {
      title: `Edit ${CONVERSATION}`,
      button: 'Save',
      data: conversation
    };
    this._ngRedux.dispatch({type: DASHBOARD.CHANGE_POPUP_DATA, popupData: this.popupData});
    this._modal.openModal(ConversationsModal, {size: 'lg', centered: true});
  }

  deleteConversation(conversation) {
    this.popupData = {
      title: `Delete ${CONVERSATION}`,
      button: 'Delete',
      data: conversation
    };
    this._ngRedux.dispatch({type: DASHBOARD.CHANGE_POPUP_DATA, popupData: this.popupData});
    this._modal.openModal(ConversationsModal);
  }

  ngOnDestroy() {
  }
}
