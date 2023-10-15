//using System;
//using System.Collections.Generic;
//using System.IO;
//using System.Linq;
//using System.Web;
//using System.Web.Mvc;
//using System.Web.UI;
//using AutoMapper;
//using Newtonsoft.Json;

//using HRSystem.Data.Entites;
//using HRSystem.Services.UserService;



//using HRSystem.Web.Infrastructure;
//using HRSystem.Web.Infrastructure.Resources;
//using HRSystem.Web.Infrastructure.ValidationMessage;
//using HRSystem.Web.Models;

//namespace ERPSystem.Web.Controllers
//{
//    public class UsersController : BaseController
//    {
//        #region Fields
//        private readonly IUserService _userService;



//        GlobalData globalData = HelperMethods.globalData;

//        private readonly IMapper _mapper;
//        #endregion

//        #region Constructors
//        public UsersController(IUserService userService, IMapper mapper)
//        {
//            _userService = userService;

//            _mapper = mapper;
//        }
//        #endregion

//        #region Methods

//        public ActionResult Index()
//        {
//            return View();
//        }

//        public ActionResult Create()
//        {
//            PopulateEmployees();
//            PopulateGroup();

//            ViewBag.Year = DateTime.Now.Year;
//            var userViewModel = new UserViewModel();
//            //userViewModel.VendorNo = _userService.GetMaxUserCode();

//            return View(userViewModel);
//        }
//        [HttpPost]
//        public ActionResult Create(UserViewModel userViewModel ,EmployeeGroupsViewModel EmployeeGroupsViewModel)
//        {
//            if (ModelState.IsValid)
//            {

//                var user = _mapper.Map<UserViewModel, Users>(userViewModel);
//                _userService.Insert(user);

//                var employeeGroup = _mapper.Map<EmployeeGroupsViewModel, EmployeeGroups>(EmployeeGroupsViewModel);
//                _userService.InsertemployeeGroup(employeeGroup);


//                AddMessage(this, "", "تم الاضافة بنجاح", MessageType.Success);
//                ModelState.Clear();
//            }

//            PopulateEmployees();
//            PopulateGroup();

//            userViewModel = new UserViewModel();
//            //userViewModel.VendorNo = _vendorService.GetMaxVendorCode();
//            return View(userViewModel);
//        }


//        public ActionResult Edit(int? id)
//        {

//            PopulateEmployees();
//            PopulateGroup();


//            var userViewModel = new UserViewModel();
//            var user = _userService.GetUserById(id);
//            var EmpolyeeGroup = _userService.GetEmpolyeeGropuById(id);
//            var groupId = EmpolyeeGroup.GroupId;

//            userViewModel = _mapper.Map<Users, UserViewModel>(user);
//            userViewModel.GroupId = groupId;
//            return View(userViewModel);
//        }
//        [HttpPost]
//        public ActionResult Edit(UserViewModel userViewModel, EmployeeGroupsViewModel EmployeeGroupsViewModel)
//        {
//            var id = 0;

//            if (ModelState.IsValid)
//            {
//                var user = _mapper.Map<UserViewModel, Users>(userViewModel);
//                _userService.Update(user);

//                var employeeGroup = _mapper.Map<EmployeeGroupsViewModel, EmployeeGroups>(EmployeeGroupsViewModel);
//                employeeGroup.UsersId = user.Id;

                
//                _userService.UpdateEmployeeGroup(employeeGroup);

//                id = user.Id;
//                AddMessage(this, "", "تم التعديل بنجاح", MessageType.Success);
//            }

//            return RedirectToAction("Edit", new { id = id });
//        }

//        public ActionResult Delete(int id)
//        {
//            var isDeleted = _userService.Delete(id);
//            return Json(new { ok = true }, JsonRequestBehavior.AllowGet);
//        }



//        public JsonResult GetUserList()
//        {
//            var users = _userService.GetAll();
//            List<UserViewModel> mappedUserList = _mapper.Map<List<UserViewModel>>(users);
//            return Json(new { data = mappedUserList }, behavior: JsonRequestBehavior.AllowGet);
//        }

//        private void PopulateEmployees()
//        {
//            var Emps = _userService.GetEmpsList();
//            var items = new SelectList(Emps, "Id", "EmployeeNameAr");
//            ViewData["Emps"] = items;
//        }


//        private void PopulateGroup()
//        {
//            var Group = _userService.GetGroupsList();
//            var items = new SelectList(Group, "Id", "NameInArabic");
//            ViewData["Group"] = items;
//        }

//        #endregion

//    }
//}
