import { Component,QueryList, Output, Input, EventEmitter, AfterViewInit, ViewChild, ViewChildren } from "@angular/core"
import { WeeklyScheduleService } from "../Services/WeeklyScheduleService"
import { HebrewDate } from "../Services/HebrewDate"
import { CourseInSchedule } from "../components/courseInSchedule"
import { ExistingCourse } from "../models/ExistingCourses"
import { Course } from "../models/Course"
import { Group } from "../models/Group"
import { DateRangeSelector } from "../components/dateRangeSelector.component"
import { UpdateScheduleBoard } from "../Services/UpdateScheduleBoard"
import { SingleCourseinBoardComponent} from "../components/SingleCourseinBoard.component"
import { SaveCoursesBoard } from "../components/SaveCoursesBoard.component"
import { DialogOptions, DialogService, DialogComponent } from "ng2-bootstrap-modal";
import { ModalData } from './modal/models/modal-data'
import { ModalService } from './modal/services/modal'
import { MoveDateService } from   "../Services/MoveDateService"
//declare function getHebrowNameByGreb(Date): any;

export interface ConfirmModel {
    title: string;
    message: string;
}
@Component({
    templateUrl: "./src/app/components/scheduleBoard.html",
    selector: "scheduleBoard"
})

export class ScheduleBoard extends DialogComponent<ConfirmModel, boolean>
implements ConfirmModel{

    constructor(private weeklyScheduleService: WeeklyScheduleService,
        private updateScheduleBoard: UpdateScheduleBoard,
        private hebrewDate: HebrewDate,
        private modalService: ModalService,
        dialogService: DialogService) {
        super(dialogService);
        this.weeklyScheduleService.GetAllExistingCoursesFromServer().subscribe(data => { this.ExistingCourses = data }, error => { alert("error!"); });
        this.weeklyScheduleService.GetAllGroupsFromServer().subscribe(data => { this.GroupList = data }, error => { });
        this.dayInWeek = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי"];
        this.date = new Date();
        this.ChangeDate = this.date;
        this.DateTimeCurrently = new Date();
        this.isbtn1clicked = false;
        this.isbtn2clicked = false;
        this.isbtn3clicked = false;
        this.ChangeGroup;//= this.GroupList[0];
        this.ChangeTable();
    }
    title: string;
    message: string;

    date: Date;
    DateTimeCurrently: Date;
    d: Date = new Date();
    dayInWeek: string[];
    GroupList: Group[];
    ExistingCourses: ExistingCourse[];
    table: ExistingCourse[][];

    SelectedGroup: Group;

    ChangeDate: Date;
    ChangeGroup: Group;
    isbtn1clicked: boolean;
    isbtn2clicked: boolean;
    isbtn3clicked: boolean;
    HebrewDate: string;
    //CurrentExistingCourse: ExistingCourse;

    

    @ViewChildren(SingleCourseinBoardComponent)
    private listsForEdit: QueryList<SingleCourseinBoardComponent>;

    @ViewChild(DateRangeSelector)
    private dateTimeCurrentlyFromComponent: DateRangeSelector;

    ngAfterViewInit() {
        setTimeout(this.date = this.dateTimeCurrentlyFromComponent.currentDate, 0);
        this.DateTimeCurrently = this.dateTimeCurrentlyFromComponent.leftDay;
    }

    getday(i: number): number {
        this.d.setTime(this.dateTimeCurrentlyFromComponent.leftDay.getTime() + (i * (1000 * 60 * 60 * 24)));
        return this.d.getDate();
    }
    
    GeneralEditing(): any {
        this.listsForEdit.forEach(x => x.EditCourse());
    }

    ngOnInit() {
        //this.ChangeGroup= this.GroupList[0];
        this.updateScheduleBoard.getNewDate().subscribe(date => { this.ChangeDate = date; });
        this.updateScheduleBoard.getSelectedGroup().subscribe(group => { this.ChangeGroup = group; });
    }

    SelectGroup(group: Group) {
        this.SelectedGroup = group;
        this.updateScheduleBoard.ChangeGroup(group);
    }
    ClickEvent(btnId: string): any {
        if (btnId == "btnEdit") {
            this.isbtn1clicked = !this.isbtn1clicked;
            this.isbtn2clicked = false;
            this.isbtn3clicked = false;
            this.GeneralEditing();
        }
        if (btnId == "btnSave") {
            this.isbtn2clicked = !this.isbtn2clicked;
            this.isbtn1clicked = false;
            this.isbtn3clicked = false;
            this.saveDate();
        }
        if (btnId == "btnPrint") {
            this.isbtn3clicked = !this.isbtn3clicked;
            this.isbtn1clicked = false;
            this.isbtn2clicked = false;
        }
    }

    ChangeTable(): any {
        this.weeklyScheduleService.GetAllExistingCoursesForWeekFromServer(this.DateTimeCurrently, this.ChangeGroup).subscribe(courses => { this.table = courses; });
    }

    //ChangeTable(selectedGroup: Group): any {
    //    //this.SelectedGroup = selectedGroup;
    //    //שינוי-עדכון הטבלה בעת בחירת קבוצה
    //    //html-איך אני עוברת על הטבלה - איך תופסים אלמנט מה
    //}

    // //להוסיף
    // //, day: number
    // //לבדוק מה הבעיה עם התאריך
    // getExistingCourseName(lesson: number): string {
    //     //לעשות בדיקת תקינות שישנו כזה קורס
    //     this.CurrentExistingCourse = this.ExistingCourses.find(c => c.GroupId == this.ChangeGroup.Id /*&& c.Date.getDay() == day*/ && c.OrderNumber == lesson);
    //     if (this.CurrentExistingCourse != undefined)
    //         return this.CurrentExistingCourse.Course.Name;
    //     return "Undefined";
    // }

    getHebrewDate(date: Date, numDaysToAdd: number): string
    {
        this.HebrewDate = this.hebrewDate.getHebrewDate(date, numDaysToAdd);
        return this.HebrewDate;

    }
    saveDate()
    {
        const modalData = new ModalData();
        modalData.component = SaveCoursesBoard;
        modalData.modalHeight = 1000;
        modalData.modalWidth = 345;
        this.modalService.openModal(modalData);
        
    }
}