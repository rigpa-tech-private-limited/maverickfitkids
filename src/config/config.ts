export class AppConfig {
  public static currentEnvironment: string = "development";
  public static API_BASE_URL = 'http://52.74.156.238/studentappws/mobile/';
  public static SITE_URL = 'http://52.74.156.238/';
  public static APP_ID = "MFK";
  public static APP_VERSION = '2.1';
  public static ERROR_MESSAGES = {
    "register": "Sorry! Details entered do not match our files! Please ensure you maintain the syntax of your name as registered with us through your school"
  };
  public static API_ERROR = "Please check your internet connection and try after some time.";
  public static CLASSES = [
    { classCode: '0001', className: 'Pre KG' },
    { classCode: '0002', className: 'LKG' },
    { classCode: '0003', className: 'UKG' }
  ];
  public static STUDENT_LOGIN = 'studentLogin';
  public static STUDENT_SIGNUP = 'insertEnrolledStudentDetails';
  public static ADD_PHOTO = 'addPhoto';
  public static VALIDATE_PROMO_CODE = 'validatePromotionCode';
  public static GET_CLASS = 'getClass';
  public static VALIDATE_GUSET_MAIL = 'validateGuestMail';
  public static VALIDATE_GUSET_MOBILE = 'validateGuestMobile';
  public static SAVE_GUEST_DETAILS = 'saveGuestDetails';
  public static GET_DISCLAIMER = 'getDisclaimer';
  public static GET_STUDENT_EXERCISE_DETAILS = 'getStudentExerciseDetails';
  public static GET_STUDENT_INSIGHT_DETAILS = 'getStudentInsightDetails';
  public static GET_STUDENT_GAMES_DETAILS = 'getStudentGamesDetailsNew';
  public static GET_GUIDE_EXERCISE_TYPE = 'getGuideExerciseType';
  public static GET_GUIDE_IMPLEMENTATION_TYPE = 'getGuideImplementationType';
  public static GET_STUDENT_GUIDE_DETAILS = 'getStudentGuideDetails';
  public static MARK_STAR_FOR_STUDENT = 'markStarForStudent';
  public static GET_COACH_VIDEO = 'getCoachVideo';
  public static GET_MINUTE_VIDEO = 'getMinuteVideoNew';
  public static GET_SPORTS_LIST = 'getSportsList';
  public static GET_SPORTS_IMPLEMENTATION_TYPE = 'getSportsImplementationType';
  public static GET_SPORTS_FITNESS_LEVEL = 'getSportsFitnessLevel';
  public static GET_SPORTS_DETAILS = 'getStudentSportsDetails';
  public static GET_STUDENT_QUIZ_DETAILS = 'getStudentQuizDetails';
  public static SAVE_STUDENT_QUIZ_DETAILS = 'saveStudentQuizDetails';
  public static GET_FRIENDS_QUIZ_RESULT = 'getFriendsQuizResult';
  public static GET_STUDENT_QUIZ_HISTORY = 'getStudentQuizHistory';
  public static VALIDATE_STUDENT_FEEDBACK = 'validateStudentFeedBack';
  public static SAVE_STUDENT_FEEDBACK = 'saveSessionFeedBack';
  public static GET_STUDENT_SESSION_DETAILS = 'getStudentSessionDetails';
  public static GET_STUDENT_TRANSFORM = 'getStudentTransform';
  public static VALIDATE_TODAY_ACCEPTANCE_CODE = 'validateTodayAcceptanceCode';
  public static MARK_STAR_FOR_PARENT_TRANSFORMATION_CHALLENGE = 'markStarForParentTransformationChallenge';
  public static GET_STUDENT_CHALLENGE = 'getStudentChallenge';
  public static GET_STUDENT_FRIEND_CHALLENGE = 'getStudentFriendChallenge';
  public static MARK_STAR_FOR_FRIENDS_TRANSFORMATION_CHALLENGE = 'markStarForFriendsTransformationChallenge';
  public static GET_STUDENT_FIT_FEST_DETAILS_FOR_III_TO_XII = 'getStudentFitFestDetailsforIIItoXII';
  public static GET_STUDENT_FIT_FEST_DETAILS_FOR_BEFORE_III = 'getStudentFitFestDetailsforbeforeIII';
  public static GET_STUDENT_FRIENDS_LIST = 'getStudentFriendsList';
  public static VERIFY_STUDENT_FRIEND_REQUEST = 'verifyStudentFriendRequest';
  public static SEND_FRIEND_REQUEST = 'sendFriendRequest';
  public static ACCEPT_STUDENT_FRIEND_REQUEST = 'acceptStudentFriendRequest';
  public static REJECT_STUDENT_FRIEND_REQUEST = 'rejectStudentFriendRequest';
  public static DISCONNECT_STUDENT_FRIEND = 'disconnectStudentFriend';
  public static GET_TO_BE_LIST = 'getToBeList';
  public static GET_TO_BE_QUOTE = 'getToBeQuote';
  public static SAVE_STUDENT_TO_BE_LIST = 'saveStudentToBeList';
  public static GET_STUDENT_FRIEND_TO_BE_LIST = 'getStudentFriendToBeList';
  public static GIVE_LIKES_FOR_FRIEND_TO_BE_LIST = 'giveLikesForFriendToBeList';
  public static GET_STUDENT_QUERY_DETAILS = 'getStudentQueryDetails';
  public static SAVE_STUDENT_QUERY_DETAILS = 'saveStudentQueryDetails';
  public static ADD_PLAYLIST = 'addPlayList';
  public static VALIDATE_OLD_PASSWORD_FOR_STUDENT = 'validateoldpasswordforstudent';
  public static SAVE_CHANGE_PASSWORD = 'saveChangePassword';
  public static GET_ENDORSER_OPTION = 'getEndorserOption';
  public static SAVE_ENDORSER_OPTION = 'saveEndorserOption';
  public static SEND_TRANSFORM_CODE = 'sendTransformCode';
  public static GET_STUDENT_CONSISTENCY = 'getStudentConsistency';
  public static GET_WEEK_STUDENT_CONSISTENCY = 'getWeeklyStudentConsistency';
  public static GET_STUDENT_3A_REVIEW = 'getStudent3AReview';
  public static GET_STUDENT_STAR = 'getStudentStar';
  public static GET_STUDENT_SPORT_SKILLS_DETAILS = 'getSportsSkills';
  public static CHECK_STUDENT_SPORT_SKILLS = 'isCheckSportSkills';
  public static GET_FIT_SPOT_TITLE = 'getFitSpotTitle';
  public static GET_FIT_SPOT_DETAILS = 'getFitSpotDetails';
  public static GET_CONSISTENCY_PHOTO = 'addConsistencyPhoto';
  public static GET_DIGITAL_CERTIFICATE = 'getStudentdigitalCertificateStatus';
  public static GET_PL_TITLE = 'getPhysicalLiteracytitle';
  public static GET_PL_DETAILS = 'getPhysicalLiteracydetails';
  public static UPDATE_PHYSICAL_LITERACY_COUNT = 'updatePhysicalLiteracycount';
  public static GET_MINUTE_VIDEO_NEW = 'getMinuteVideoNew';
}
