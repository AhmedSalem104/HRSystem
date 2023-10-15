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
using HRSystem.Services.BankService;
using HRSystem.Web.Infrastructure.ValidationMessage;
using HRSystem.Web.Models;
using HRSystem.Data.Entites;
using HRSystem.Data.Entites.Payroll;
//using HRSystem.Services.SecurityService;


namespace HRSystem.Web.Controllers
{
    public class BankController : BaseController
    {
        #region Fields
        private readonly IBankService _bankService;
        //private readonly ILoggedUserService _loggedUserService;
        //GlobalData globalData = HelperMethods.globalData;
        private readonly IMapper _mapper;
        #endregion

        #region Constructors
        public BankController(IBankService bankService,/*, ILoggedUserService loggedUserService, */IMapper mapper)
        {
            _bankService = bankService;
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
            var BankViewModel = new BankViewModel();
            //BankViewModel.BankId = (byte)_bankService.GetMaxBankCode();

            return PartialView("_Create", BankViewModel);
        }
        [HttpPost]
        public ActionResult Create(BankViewModel BankViewModel)
        {
            if (ModelState.IsValid)
            {
               var bank = _mapper.Map<BankViewModel, Bank>(BankViewModel);

                _bankService.Insert(bank);

                AddMessage(this, "", "تم الاضافة بنجاح", MessageType.Success);
            }
                return Redirect(Request.UrlReferrer.PathAndQuery);
        }
        public ActionResult Edit(int? id)
        {
            var BankViewModel = new BankViewModel();
            var bank = _bankService.GetBankById(id);
            BankViewModel = _mapper.Map<Bank, BankViewModel>(bank);
          
            return PartialView("_Edit", BankViewModel);
        }
        [HttpPost]
        public ActionResult Edit(BankViewModel BankViewModel)
        {
            if (ModelState.IsValid)
            {
                var bank = _mapper.Map<BankViewModel, Bank>(BankViewModel);
                _bankService.Update(bank);
                AddMessage(this, "", "تم التعديل بنجاح", MessageType.Success);
            }
                return Redirect(Request.UrlReferrer.PathAndQuery);
        }
        public ActionResult Delete(int id)
        {
            var isDeleted = _bankService.Delete(id);
              return Json(new { ok = true}, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetBankList()
        {
            var Banklist = _bankService.GetAll();
            return Json(new { data = Banklist }, behavior: JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult CheckBankNo(int? bankNo)
        {
            var checkcode = _bankService.CheckBankNo(bankNo);

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