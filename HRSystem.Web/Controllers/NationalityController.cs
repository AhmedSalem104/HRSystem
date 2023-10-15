using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using AutoMapper;
using HRSystem.Web.Infrastructure;
//using PagedList;
using HRSystem.Data;
using HRSystem.Services;
using HRSystem.Services.NationalityService;
using HRSystem.Web.Infrastructure.ValidationMessage;
using HRSystem.Web.Models;
using HRSystem.Data.Entites;
using HRSystem.Data.Entites.Payroll;
//using HRSystem.Services.SecurityService;


namespace HRSystem.Web.Controllers
{
    public class NationalityController : BaseController
    {
        #region Fields
        private readonly INationalityService _nationalService;
        //private readonly ILoggedUserService _loggedUserService;
        //GlobalData globalData = HelperMethods.globalData;
        private readonly IMapper _mapper;
        #endregion

        #region Constructors
        public NationalityController(INationalityService nationalService,/*, ILoggedUserService loggedUserService, */IMapper mapper)
        {
            _nationalService = nationalService;
            //_loggedUserService = loggedUserService;
            _mapper = mapper;
        }
        #endregion

        #region Methods
        // GET: National
        public ActionResult Index()
        {

            //bool flagAdd = _loggedUserService.InRole("Nationality", "create", (int)globalData.EmployeeId);
            //bool flagEdit = _loggedUserService.InRole("Nationality", "edit", (int)globalData.EmployeeId);
            //bool flagDelete = _loggedUserService.InRole("Nationality", "delete", (int)globalData.EmployeeId);
            //if (flagAdd)
            //{
            //    ViewBag.CanAdd = true;
            //}
            //if (flagEdit)
            //{
            //    ViewBag.CanEdit = true;
            //}
            //if (flagDelete)
            //{
            //    ViewBag.CanDelete = true;
            //}


            return View();
        }
        
        public ActionResult Create()
        {
            var nationalViewModel = new NationalViewModel();

            return PartialView("_Create", nationalViewModel);
        }
        [HttpPost]
        public ActionResult Create(NationalViewModel nationalViewModel)
        {
            if (ModelState.IsValid)
            {
               var national = _mapper.Map<NationalViewModel, Nationality>(nationalViewModel);

                _nationalService.Insert(national);

                AddMessage(this, "", "تم الاضافة بنجاح", MessageType.Success);
            }
                return Redirect(Request.UrlReferrer.PathAndQuery);
        }
        public ActionResult Edit(int? id)
        {
            var nationalViewModel = new NationalViewModel();
            var national = _nationalService.GetNationalityById(id);
            nationalViewModel = _mapper.Map<Nationality, NationalViewModel>(national);
          
            return PartialView("_Edit", nationalViewModel);
        }
        [HttpPost]
        public ActionResult Edit(NationalViewModel nationalViewModel)
        {
            if (ModelState.IsValid)
            {
                var national = _mapper.Map<NationalViewModel, Nationality>(nationalViewModel);
                _nationalService.Update(national);
                AddMessage(this, "", "تم التعديل بنجاح", MessageType.Success);
            }
                return Redirect(Request.UrlReferrer.PathAndQuery);
        }
        public ActionResult Delete(int id)
        {
            var isDeleted = _nationalService.Delete(id);
              return Json(new { ok = true}, JsonRequestBehavior.AllowGet);
        }

        //public ActionResult CheckDelete(int id)
        //{
        //    var isDeleted = _nationalService.Delete(id);
        //    return Json(new { ok = true }, JsonRequestBehavior.AllowGet);
        //}
        public JsonResult GetNationalList()
        {
            var nationalList = _nationalService.GetAll();
            return Json(new { data = nationalList }, behavior: JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult CheckNationalNo(int? nationalNo)
        {
            var checknationalNo = _nationalService.CheckNationalityNo(nationalNo);

            if (checknationalNo.Count() != 0)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(true, JsonRequestBehavior.AllowGet);

            }
        }
        #endregion
    }
}