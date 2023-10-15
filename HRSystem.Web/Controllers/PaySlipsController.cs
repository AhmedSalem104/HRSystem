using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using AutoMapper;
using HRSystem.Web.Infrastructure;
using HRSystem.Data;
using HRSystem.Services;
using HRSystem.Services.PaySlipsService;
using HRSystem.Web.Infrastructure.ValidationMessage;
using HRSystem.Web.Models;
using HRSystem.Data.Entites;
using HRSystem.Data.Entites.Payroll;
//using HRSystem.Services.SecurityService;


namespace HRSystem.Web.Controllers
{
    public class PaySlipsController : BaseController
    {
        #region Fields
        private readonly IPaySlipsService _paySlipsService;
        //private readonly ILoggedUserService _loggedUserService;
        //GlobalData globalData = HelperMethods.globalData;
        private readonly IMapper _mapper;
        #endregion

        #region Constructors
        public PaySlipsController(IPaySlipsService paySlipsService,/*, ILoggedUserService loggedUserService, */IMapper mapper)
        {
            _paySlipsService = paySlipsService;
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
            var PaySlipViewModel = new PaySlipViewModel();
            //PaySlipViewModel.PaySlipID = (byte)_paySlipsService.GetMaxPaySlipCode();

            return PartialView("_Create", PaySlipViewModel);
        }
        [HttpPost]
        public ActionResult Create(PaySlipViewModel PaySlipViewModel)
        {
            if (ModelState.IsValid)
            {
               var PaySlip = _mapper.Map<PaySlipViewModel, PaySlip>(PaySlipViewModel);

                _paySlipsService.Insert(PaySlip);

                AddMessage(this, "", "تم الاضافة بنجاح", MessageType.Success);
            }
                return Redirect(Request.UrlReferrer.PathAndQuery);
        }
        public ActionResult Edit(int? id)
        {
            var PaySlipViewModel = new PaySlipViewModel();
            var PaySlip = _paySlipsService.GetPaySlipById(id);
            PaySlipViewModel = _mapper.Map<PaySlip, PaySlipViewModel>(PaySlip);
          
            return PartialView("_Edit", PaySlipViewModel);
        }
        [HttpPost]
        public ActionResult Edit(PaySlipViewModel PaySlipViewModel)
        {
            if (ModelState.IsValid)
            {
                var PaySlip = _mapper.Map<PaySlipViewModel, PaySlip>(PaySlipViewModel);
                _paySlipsService.Update(PaySlip);
                AddMessage(this, "", "تم التعديل بنجاح", MessageType.Success);
            }
                return Redirect(Request.UrlReferrer.PathAndQuery);
        }
        public ActionResult Delete(int id)
        {
            var isDeleted = _paySlipsService.Delete(id);
              return Json(new { ok = true}, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPaySlipList()
        {
            var PaySliplist = _paySlipsService.GetAll();
            return Json(new { data = PaySliplist }, behavior: JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult CheckBankNo(int? PaySlipNo)
        {
            var checkcode = _paySlipsService.CheckPaySlipNo(PaySlipNo);

            if (checkcode.Count() != 0)
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