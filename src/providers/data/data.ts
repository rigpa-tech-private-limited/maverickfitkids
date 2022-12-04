import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/take";
import { AppConfig } from "../../config/config";
import { AuthServiceProvider } from "../../providers/auth/auth";
import { Http } from "@angular/http";
@Injectable()
export class DataProvider {
  data: any;
  constructor(public authService: AuthServiceProvider, public http: Http) {}

  loadQuestions() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise((resolve) => {
      this.http
        .get("assets/data/questions.json")
        .map((res) => res.json())
        .subscribe((data) => {
          this.data = data.questions;
          resolve(this.data);
        });
    });
  }

  studentLogin(formData) {
    return new Promise((resolve, reject) => {
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentName: formData.existing_student_name,
              studentId: formData.existing_student_mfk_id,
            },
          },
          AppConfig.STUDENT_LOGIN
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  studentSignup(formData) {
    return new Promise((resolve, reject) => {
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentname: formData.student_name,
              dob: formData.dob,
              gender: formData.gender,
              mobile: formData.mobile,
              emailid: formData.email,
              classname: formData.classname,
            },
          },
          AppConfig.STUDENT_SIGNUP
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  isCheckSportSkills(schoolcode, classcode) {
    return new Promise((resolve, reject) => {
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              schoolcode: schoolcode,
              classcode: classcode,
            },
          },
          AppConfig.CHECK_STUDENT_SPORT_SKILLS
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  addPhoto(formData, encodeImg) {
    return new Promise((resolve, reject) => {
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: formData.studentId,
              image: encodeImg,
              imagepath: formData.studentId,
              ext: "jpeg",
              studentaccesslevel: formData.studentAccessLevel,
            },
          },
          AppConfig.ADD_PHOTO
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getStudentStar(formData) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              academicyear: aData.academicYear,
              studentaccesslevel: aData.studentAccessLevel,
            },
          },
          AppConfig.GET_STUDENT_STAR
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  validatePromotionCode(formData) {
    return new Promise((resolve, reject) => {
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              promotecode: formData.school_access_code,
            },
          },
          AppConfig.VALIDATE_PROMO_CODE
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getClass() {
    return new Promise((resolve, reject) => {
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
            },
          },
          AppConfig.GET_CLASS
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  validateGuestMail(email) {
    return new Promise((resolve, reject) => {
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              mailid: email,
            },
          },
          AppConfig.VALIDATE_GUSET_MAIL
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  validateGuestMobile(mobile) {
    return new Promise((resolve, reject) => {
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              mobile: mobile,
            },
          },
          AppConfig.VALIDATE_GUSET_MOBILE
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  saveGuestDetails(formData) {
    return new Promise((resolve, reject) => {
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              promotecode: formData.promotecode,
              studentname: formData.studentname,
              schoolcode: formData.school.code,
              classcode: formData.class.classCode,
              sectionname: formData.section,
              dob: formData.dob,
              gender: formData.gender,
              optionType: formData.optionType,
              parentname: formData.parentname,
              emailid: formData.parentemail,
              parentmobile: formData.parentmobile,
              image: formData.image,
              imagepath: formData.imagepath,
              ext: formData.ext,
            },
          },
          AppConfig.SAVE_GUEST_DETAILS
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getDisclaimer() {
    return new Promise((resolve, reject) => {
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
            },
          },
          AppConfig.GET_DISCLAIMER
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getStudentExerciseDetails(formData) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      console.log(aData.studentAge);
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentage: aData.studentAge,
              studentaccesslevel: aData.studentAccessLevel,
            },
          },
          AppConfig.GET_STUDENT_EXERCISE_DETAILS
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getStudentSportSkillsDetails(formData) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      console.log(aData.studentAge);
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              schoolcode: aData.schoolCode,
              classcode: aData.classCode,
            },
          },
          AppConfig.GET_STUDENT_SPORT_SKILLS_DETAILS
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getStudentInsightDetails(formData) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      console.log(aData.studentAge);
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              academicyear: aData.academicYear,
              classcode: aData.classCode,
            },
          },
          AppConfig.GET_STUDENT_INSIGHT_DETAILS
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getStudentGamesDetails(formData) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      console.log(aData.studentAge);
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentage: aData.studentAge,
              studentaccesslevel: aData.studentAccessLevel,
            },
          },
          AppConfig.GET_STUDENT_GAMES_DETAILS
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getGuideExerciseType(formData) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      console.log(aData.classCode);
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              classcode: aData.classCode,
            },
          },
          AppConfig.GET_GUIDE_EXERCISE_TYPE
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getFitSpotTitle(formData) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      console.log(aData.classCode);
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              classcode: aData.classCode,
            },
          },
          AppConfig.GET_FIT_SPOT_TITLE
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getGuideImplementationType(formData, pmextypecode) {
    return new Promise((resolve, reject) => {
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              extypecode: pmextypecode,
              classcode: formData.classCode,
            },
          },
          AppConfig.GET_GUIDE_IMPLEMENTATION_TYPE
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getStudentGuideDetails(formData, pmExercise, pmImplementation) {
    return new Promise((resolve, reject) => {
      let postData: any;
      if (pmImplementation != null && pmImplementation != "") {
        postData = {
          applicationId: AppConfig.APP_ID,
          extypecode: pmExercise,
          implementcode: pmImplementation,
          classcode: formData.classCode,
        };
      } else {
        postData = {
          applicationId: AppConfig.APP_ID,
          extypecode: pmExercise,
          implementcode: "",
          classcode: formData.classCode,
        };
      }
      this.authService
        .postData(
          {
            content: postData,
          },
          AppConfig.GET_STUDENT_GUIDE_DETAILS
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getFitSpotDetails(formData, pmExercise) {
    return new Promise((resolve, reject) => {
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              fitspotCode: pmExercise,
              classcode: formData.classCode,
            },
          },
          AppConfig.GET_FIT_SPOT_DETAILS
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  markStarForStudent(formData, pmeventType) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      console.log(aData.studentAge);
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              eventType: pmeventType,
              academicyear: aData.academicYear,
              classcode: aData.classCode,
              studentaccesslevel: aData.studentAccessLevel,
            },
          },
          AppConfig.MARK_STAR_FOR_STUDENT
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getCoachVideo(formData) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              classcode: aData.classCode,
              studentaccesslevel: aData.studentAccessLevel,
            },
          },
          AppConfig.GET_COACH_VIDEO
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getMinuteVideo() {
    return new Promise((resolve, reject) => {
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
            },
          },
          AppConfig.GET_MINUTE_VIDEO
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getSportsList() {
    return new Promise((resolve, reject) => {
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
            },
          },
          AppConfig.GET_SPORTS_LIST
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getSportsImplementationType() {
    return new Promise((resolve, reject) => {
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
            },
          },
          AppConfig.GET_SPORTS_IMPLEMENTATION_TYPE
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getSportsFitnessLevel() {
    return new Promise((resolve, reject) => {
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
            },
          },
          AppConfig.GET_SPORTS_FITNESS_LEVEL
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getStudentSportsDetails(sportsCode, implementationCode, sportsFitnessCode) {
    return new Promise((resolve, reject) => {
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              sportsCode: sportsCode,
              implementationCode: implementationCode,
              sportsFitnessCode: sportsFitnessCode,
            },
          },
          AppConfig.GET_SPORTS_DETAILS
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getStudentQuizDetails(formData) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
            },
          },
          AppConfig.GET_STUDENT_QUIZ_DETAILS
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  saveStudentQuizDetails(formData, quizId, quizDetails, optionDetails) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      let aquizDetails = quizDetails;
      let aoptionDetails = optionDetails;
      console.log(JSON.stringify(aquizDetails), JSON.stringify(aoptionDetails));
      let contentStr = {
        content: {
          applicationId: AppConfig.APP_ID,
          studentid: aData.studentId,
          quizId: quizId,
          academicyear: aData.academicYear,
          classcode: aData.classCode,
          quizDetails: aquizDetails,
          optionDetails: optionDetails,
        },
      };
      console.log(contentStr, JSON.stringify(contentStr));
      this.authService
        .postData(contentStr, AppConfig.SAVE_STUDENT_QUIZ_DETAILS)
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getFriendsQuizResult(formData, quizId) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              quizid: quizId,
              academicyear: aData.academicYear,
            },
          },
          AppConfig.GET_FRIENDS_QUIZ_RESULT
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getStudentQuizHistory(formData) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
            },
          },
          AppConfig.GET_STUDENT_QUIZ_HISTORY
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  validateStudentFeedBack(formData) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
            },
          },
          AppConfig.VALIDATE_STUDENT_FEEDBACK
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  saveSessionFeedBack(formData, sessioncode, imageid) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      let asessioncode = sessioncode;
      let aimageid = imageid;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              sessioncode: asessioncode,
              imageid: aimageid,
            },
          },
          AppConfig.SAVE_STUDENT_FEEDBACK
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getStudentSessionDetails(formData) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
            },
          },
          AppConfig.GET_STUDENT_SESSION_DETAILS
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getStudentTransform(formData) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              academicyear: aData.academicYear,
              classcode: aData.classCode,
            },
          },
          AppConfig.GET_STUDENT_TRANSFORM
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  validateTodayAcceptanceCode(formData, acceptancecode) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      let aAcceptancecode = acceptancecode;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              acceptancecode: aAcceptancecode,
            },
          },
          AppConfig.VALIDATE_TODAY_ACCEPTANCE_CODE
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  markStarForParentTransformationChallenge(formData, acceptancecode) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      let aAcceptancecode = acceptancecode;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              acceptanceCode: aAcceptancecode,
              studentaccesslevel: aData.studentAccessLevel,
              academicyear: aData.academicYear,
              classcode: aData.classCode,
            },
          },
          AppConfig.MARK_STAR_FOR_PARENT_TRANSFORMATION_CHALLENGE
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getStudentChallenge(formData) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              academicyear: aData.academicYear,
              classcode: aData.classCode,
            },
          },
          AppConfig.GET_STUDENT_CHALLENGE
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getStudentFriendChallenge(studentfriendid) {
    return new Promise((resolve, reject) => {
      let astudentfriendid = studentfriendid;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentfriendid: astudentfriendid,
            },
          },
          AppConfig.GET_STUDENT_FRIEND_CHALLENGE
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  markStarForFriendsTransformationChallenge(formData, submitedstudentid) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      let asubmitedstudentid = submitedstudentid;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              submitedstudentid: asubmitedstudentid,
              studentaccesslevel: aData.studentAccessLevel,
              academicyear: aData.academicYear,
              classcode: aData.classCode,
            },
          },
          AppConfig.MARK_STAR_FOR_FRIENDS_TRANSFORMATION_CHALLENGE
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getStudentFitFestDetailsforIIItoXII(formData) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              schoolcode: aData.schoolCode,
              classcode: aData.classCode,
              sectionname: aData.sectionName,
              gender: aData.gender,
              academicyear: aData.academicYear,
            },
          },
          AppConfig.GET_STUDENT_FIT_FEST_DETAILS_FOR_III_TO_XII
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getStudentFitFestDetailsforbeforeIII(formData) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              schoolcode: aData.schoolCode,
              classcode: aData.classCode,
              sectionname: aData.sectionName,
              gender: aData.gender,
              academicyear: aData.academicYear,
            },
          },
          AppConfig.GET_STUDENT_FIT_FEST_DETAILS_FOR_BEFORE_III
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getStudentFriendsList(formData) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              academicyear: aData.academicYear,
            },
          },
          AppConfig.GET_STUDENT_FRIENDS_LIST
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  verifyStudentFriendRequest(formData, friendstudentid) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      let afriendstudentid = friendstudentid;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              friendstudentid: afriendstudentid,
            },
          },
          AppConfig.VERIFY_STUDENT_FRIEND_REQUEST
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  sendFriendRequest(formData, friendstudentid) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      let afriendstudentid = friendstudentid;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              friendstudentid: afriendstudentid,
            },
          },
          AppConfig.SEND_FRIEND_REQUEST
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  acceptStudentFriendRequest(formData, fitzonecode) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      let afitzonecode = fitzonecode;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              fitzonecode: afitzonecode,
            },
          },
          AppConfig.ACCEPT_STUDENT_FRIEND_REQUEST
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  rejectStudentFriendRequest(formData, fitzonecode) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      let afitzonecode = fitzonecode;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              fitzonecode: afitzonecode,
            },
          },
          AppConfig.REJECT_STUDENT_FRIEND_REQUEST
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  disconnectStudentFriend(formData, fitzonecode) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      let afitzonecode = fitzonecode;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              fitzonecode: afitzonecode,
            },
          },
          AppConfig.DISCONNECT_STUDENT_FRIEND
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getToBeList(formData) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
            },
          },
          AppConfig.GET_TO_BE_LIST
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getToBeQuote(formData, intendcode) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      let aintendcode = intendcode;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              intendcode: aintendcode,
            },
          },
          AppConfig.GET_TO_BE_QUOTE
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  saveStudentToBeList(formData, intendcode) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      let aintendcode = intendcode;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              intendcode: aintendcode,
              studentaccesslevel: aData.studentAccessLevel,
            },
          },
          AppConfig.SAVE_STUDENT_TO_BE_LIST
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getStudentFriendToBeList(formData, friendstudentid) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      let afriendstudentid = friendstudentid;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              friendstudentid: afriendstudentid,
            },
          },
          AppConfig.GET_STUDENT_FRIEND_TO_BE_LIST
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  giveLikesForFriendToBeList(formData, friendstudentid, intendcode) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      let afriendstudentid = friendstudentid;
      let aintendcode = intendcode;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              friendstudentid: afriendstudentid,
              intendcode: aintendcode,
            },
          },
          AppConfig.GIVE_LIKES_FOR_FRIEND_TO_BE_LIST
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getStudentQueryDetails(formData) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              studentaccesslevel: aData.studentAccessLevel,
            },
          },
          AppConfig.GET_STUDENT_QUERY_DETAILS
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  saveStudentQueryDetails(formData, querycontent) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      let aquerycontent = querycontent;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              querycontent: aquerycontent,
              studentaccesslevel: aData.studentAccessLevel,
            },
          },
          AppConfig.SAVE_STUDENT_QUERY_DETAILS
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  addPlayList(formData, ext) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      let aext = ext;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              ext: aext,
              studentaccesslevel: aData.studentAccessLevel,
            },
          },
          AppConfig.ADD_PLAYLIST
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  validateoldpasswordforstudent(formData, oldpassword) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      let aoldpassword = oldpassword;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              oldpassword: aoldpassword,
              studentaccesslevel: aData.studentAccessLevel,
            },
          },
          AppConfig.VALIDATE_OLD_PASSWORD_FOR_STUDENT
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  saveChangePassword(formData, oldpassword, newpassword) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      let aoldpassword = oldpassword;
      let anewpassword = newpassword;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              oldpassword: aoldpassword,
              newpassword: anewpassword,
              studentaccesslevel: aData.studentAccessLevel,
            },
          },
          AppConfig.SAVE_CHANGE_PASSWORD
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getEndorserOption(formData) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              studentaccesslevel: aData.studentAccessLevel,
            },
          },
          AppConfig.GET_ENDORSER_OPTION
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  saveEndorserOption(formData, optiontype) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      let aoptiontype = optiontype;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              optiontype: aoptiontype,
              studentaccesslevel: aData.studentAccessLevel,
            },
          },
          AppConfig.SAVE_ENDORSER_OPTION
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  sendTransformCode(formData) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              mailId: aData.mailId,
              studentaccesslevel: aData.studentAccessLevel,
            },
          },
          AppConfig.SEND_TRANSFORM_CODE
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getStudentConsistency(formData) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
            },
          },
          //{ "content": { "applicationId": "MFK", "studentid": "MFK012790" } }
          AppConfig.GET_STUDENT_CONSISTENCY
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getWeeklyStudentConsistency(formData) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
            },
          },
          //{ "content": { "applicationId": "MFK", "studentid": "MFK012790" } }
          AppConfig.GET_WEEK_STUDENT_CONSISTENCY
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getMonthlyStudentConsistency(formData, month) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              month: month,
            },
          },
          //{ "content": { "applicationId": "MFK", "studentid": "MFK012790" } }
          AppConfig.GET_WEEK_STUDENT_CONSISTENCY
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  addConsistencyPhoto(formData, imageUri, imageName) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              image: imageUri,
              imagename: imageName,
            },
          },
          AppConfig.GET_CONSISTENCY_PHOTO
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getStudent3AReview(formData) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: aData.studentId,
              academicyear: aData.academicYear,
            },
          },
          //{ "content": { "applicationId": "MFK", "studentid": "MFK012216", "academicyear": "2018-2019" } }
          AppConfig.GET_STUDENT_3A_REVIEW
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getStudentdigitalCertificateStatus(formData, month, year) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              schoolcode: aData.schoolCode,
              studentid: aData.studentId,
              month: month,
              year: "" + year,
            },
          },
          AppConfig.GET_DIGITAL_CERTIFICATE
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getPhysicalLiteracytitle(formData) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              schoolcode: aData.schoolCode,
              classcode: aData.classCode,
            },
          },
          AppConfig.GET_PL_TITLE
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getPhysicalLiteracydetails(formData) {
    return new Promise((resolve, reject) => {
      let aData = formData;
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              schoolcode: aData.schoolCode,
              classcode: aData.classCode,
            },
          },
          AppConfig.GET_PL_DETAILS
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  updatePhysicalLiteracycount(formData, videocode) {
    return new Promise((resolve, reject) => {
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: formData.studentId,
              videocode: videocode,
            },
          },
          AppConfig.UPDATE_PHYSICAL_LITERACY_COUNT
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getMinuteVideoNew(formData) {
    return new Promise((resolve, reject) => {
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: formData.studentId,
            },
          },
          AppConfig.GET_MINUTE_VIDEO_NEW
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getPhysicalLiteracyJourney(formData) {
    return new Promise((resolve, reject) => {
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              schoolcode: formData.schoolCode,
              studentid: formData.studentId,
              classcode: formData.classCode,
              academicyear: formData.academicYear,
            },
          },
          AppConfig.GET_PHYSICAL_LITERACY_JOURNEY
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  savePhysicalJourney(formData) {
    return new Promise((resolve, reject) => {
      this.authService
        .postData(
          {
            content: {
              applicationId: AppConfig.APP_ID,
              studentid: formData.studentId,
              questionArray: formData.questionArray,
              optionArray: formData.optionArray,
              academicyear: formData.academicYear,
            },
          },
          AppConfig.SAVE_PHYSICAL_LITERACY_JOURNEY
        )
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  romanValue(r) {
    if (r === "I") return 1;
    if (r === "V") return 5;
    if (r === "X") return 10;
    return -1;
  }

  getClassNumber(str) {
    var res = 0;

    for (let i = 0; i < str.length; i++) {
      var s1 = this.romanValue(str.charAt(i));
      if (i + 1 < str.length) {
        var s2 = this.romanValue(str.charAt(i + 1));
        if (s1 >= s2) {
          res = res + s1;
        } else {
          res = res + s2 - s1;
          i++;
        }
      } else {
        res = res + s1;
      }
    }
    if (res > 0) {
      let resArr = [];
      resArr.push(res);
      return resArr;
    } else {
      str = str.toLowerCase();
      if (str.includes("and")) {
        let arr = str.split("and").map(Number);
        return arr;
      } else if (str.includes("to")) {
        let arr = str.split("to").map(Number);
        let resArr = [];
        if (arr.length > 0) {
          let num1 = parseInt(arr[0]);
          let num2 = parseInt(arr[1]);
          if (num2 < 1) {
            console.error("num must be greater than 1");
          }

          if (!Number.isInteger(num2)) {
            num2 = Math.trunc(num2);
          }

          for (var i = num1; i <= num2; i++) {
            resArr.push(i);
          }
          return resArr;
        }
      } else {
        let resArr = [];
        if (str === "prekg" || str === "pre kg" || str === "pre-kg") {
          resArr.push(-3);
          return resArr;
        } else if (str === "lkg") {
          resArr.push(-2);
          return resArr;
        } else if (str === "ukg") {
          resArr.push(-1);
          return resArr;
        } else {
          if (parseInt(str) > 0) {
            resArr.push(parseInt(str));
            return resArr;
          } else {
            resArr.push(0);
            return resArr;
          }
        }
      }
    }
  }
}
