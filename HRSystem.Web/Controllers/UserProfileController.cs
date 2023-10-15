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
//using HRSystem.Web.Reporting.Crystal;
//using HRSystem.Services.SecurityService;


//namespace RealEstate.Web.Controllers
//{
//    public class UserProfileController : BaseController
//    {
//        #region Fields
//        private readonly IUserService _userService;
//        private readonly ILoggedUserService _loggedUserService;
//        GlobalData globalData = HelperMethods.globalData;
//        private readonly IMapper _mapper;
//        #endregion

//        #region Constructors
//        public UserProfileController(IUserService userService, ILoggedUserService loggedUserService, IMapper mapper)
//        {
//            _userService = userService;
//            _loggedUserService = loggedUserService;
//            _mapper = mapper;
//        }
//        #endregion

//        #region Methods


       
//        public ActionResult Edit(int? id)
        
//        {
//            PopulateEmployees();
//            var userViewModel = new UserViewModel();
//            var userService = _userService.GetUserById(id);
//            userViewModel = _mapper.Map<Users, UserViewModel>(userService);
//            return View(userViewModel);
//        }
//        [HttpPost]
//        public ActionResult Edit(UserViewModel userViewModel)
//        {
//            var id = 0;

//            if (ModelState.IsValid)
//            {
//                var userService = _mapper.Map<UserViewModel, Users>(userViewModel);
//                _userService.Update(userService);
//                id = userService.Id;
//                AddMessage(this, "", "تم التعديل بنجاح", MessageType.Success);
//            }

//            return RedirectToAction("Edit", new { id = id });
//        }



//        private void PopulateEmployees()
//        {
//            var Emps = _userService.GetEmpsList();
//            var items = new SelectList(Emps, "Id", "EmployeeNameAr");
//            ViewData["Emps"] = items;
//        }
//        #endregion
//    }
//}
