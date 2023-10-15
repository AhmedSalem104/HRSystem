using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using AutoMapper;
using Newtonsoft.Json;

using HRSystem.Data.Entites;

using HRSystem.Services.DecisionEndStopHandService;
using HRSystem.Services.EmployeesService;



using HRSystem.Web.Infrastructure;
using HRSystem.Web.Infrastructure.Resources;
using HRSystem.Web.Infrastructure.ValidationMessage;
using HRSystem.Web.Models;
using HRSystem.Data.Entites.Payroll;

namespace HRSystem.Web.Controllers
{
    public class DecisionEndStopHandController : BaseController
    {
        #region Fields
        private readonly IDecisionEndStopHandService _DecisionEndStopHandService;
        private readonly IEmployeesService _employeesService;

        //private readonly ILoggedUserService _loggedUserService;
        //GlobalData globalData = HelperMethods.globalData;
        private readonly IMapper _mapper;
        #endregion

        #region Constructors
        public DecisionEndStopHandController(IDecisionEndStopHandService DecisionEndStopHandService, IEmployeesService employeesService, IMapper mapper)
        {
            _DecisionEndStopHandService = DecisionEndStopHandService;
            _employeesService = employeesService;



            _mapper = mapper;
        }
        #endregion

        #region Methods

        public ActionResult Index()
        {

            //bool flagAdd = _loggedUserService.InRole("Driver", "create", (int)globalData.EmployeeId);
            //bool flagEdit = _loggedUserService.InRole("Driver", "edit", (int)globalData.EmployeeId);
            //bool flagDelete = _loggedUserService.InRole("Driver", "delete", (int)globalData.EmployeeId);
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
            PopulateNational();
            PopulateOwner();
            //PopulateBranch();
            //PopulateNational();

            Session["Value"] = "Create";
            //ViewBag.Year = DateTime.Now.Year;
            var DecisionEndStopHandViewModel = new DecisionEndStopHandViewModel();
            DecisionEndStopHandViewModel.DecisionEndStopHandID = (int)_DecisionEndStopHandService.GetMaxDecisionEndStopHandCode();

            return View(DecisionEndStopHandViewModel);
        }
        [HttpPost]
        public ActionResult Create(DecisionEndStopHandViewModel DecisionEndStopHandViewModel)
        {
            if (ModelState.IsValid)
            {

                var Decision = _mapper.Map<DecisionEndStopHandViewModel, DecisionEndStopHand>(DecisionEndStopHandViewModel);
                _DecisionEndStopHandService.Insert(Decision);

                AddMessage(this, "", "تم الاضافة بنجاح", MessageType.Success);
                //ModelState.Clear();
            }
            PopulateNational();
            PopulateOwner();
            //PopulateBranch();
            //PopulateNational();

            var id = _DecisionEndStopHandService.GetMaxId();
            Session["Id"] = id;

            DecisionEndStopHandViewModel = new DecisionEndStopHandViewModel();
            DecisionEndStopHandViewModel.DecisionEndStopHandID = (int)_DecisionEndStopHandService.GetMaxDecisionEndStopHandCode();
            return View(DecisionEndStopHandViewModel);
        }

        //public ActionResult PrintRow(int id)
        //{

        //    var driver = _driverService.GetDriverByIdForPrint(id);
        //    List<DriverPrintViewModel> mappedDriverRptsList = _mapper.Map<List<DriverPrintViewModel>>(driver);
        //    DriversRowReport driverRpt = new DriversRowReport();
        //    driverRpt.Load();
        //    driverRpt.SetDataSource(mappedDriverRptsList);
        //    Response.Buffer = false;
        //    Response.ClearContent();
        //    Response.ClearHeaders();
        //    driverRpt.SetParameterValue("CompanyName", globalData.CompanyName);
        //    driverRpt.SetParameterValue("UserName", globalData.LoginName);
        //    Stream reportFile = driverRpt.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
        //    reportFile.Seek(0, SeekOrigin.Begin);
        //    return File(reportFile, "application/pdf");
        //}
        //public ActionResult PrintAll()
        //{

        //    var driver = _DecisionEndStopHandService.GetAllDriversForPrint();
        //    List<DriverPrintViewModel> mappedDriverRptsList = _mapper.Map<List<DriverPrintViewModel>>(driver);
        //    AllDriversReport driverRpt = new AllDriversReport();
        //    driverRpt.Load();
        //    driverRpt.SetDataSource(mappedDriverRptsList);
        //    Response.Buffer = false;
        //    Response.ClearContent(); 
        //    Response.ClearHeaders();
        //    driverRpt.SetParameterValue("CompanyName", globalData.CompanyName);
        //    driverRpt.SetParameterValue("UserName", globalData.LoginName);
        //    Stream reportFile = driverRpt.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
        //    reportFile.Seek(0, SeekOrigin.Begin);
        //    return File(reportFile, "application/pdf");
        //}

        public ActionResult Edit(int? id)
        {
            PopulateNational();
            PopulateOwner();
            //PopulateBranch();
            //PopulateNational();

            Session["Value"] = "Edit";


            var DecisionEndStopHandViewModel = new DecisionEndStopHandViewModel();
            var DriverService = _DecisionEndStopHandService.GetDecisionEndStopHandById(id);
            DecisionEndStopHandViewModel = _mapper.Map<DecisionEndStopHand, DecisionEndStopHandViewModel>(DriverService);
            return View(DecisionEndStopHandViewModel);
        }
        [HttpPost]
        public ActionResult Edit(DecisionEndStopHandViewModel DecisionEndStopHandViewModel)
        {
            var id = 0;

            if (ModelState.IsValid)
            {
                var driverService = _mapper.Map<DecisionEndStopHandViewModel, DecisionEndStopHand>(DecisionEndStopHandViewModel);
                _DecisionEndStopHandService.Update(driverService);
                id = driverService.DecisionEndStopHandID;
                AddMessage(this, "", "تم التعديل بنجاح", MessageType.Success);
            }

            return RedirectToAction("Edit", new { id = id });
        }

        public ActionResult Delete(int id)
        {
            var isDeleted = _DecisionEndStopHandService.Delete(id);
            return Json(new { ok = true }, JsonRequestBehavior.AllowGet);
        }

    

        public JsonResult GetDecisionEndStopHandList()
        {


            var List = _DecisionEndStopHandService.GetAll();



            return Json(new { data = List }, behavior: JsonRequestBehavior.AllowGet);



            //var driverService = _driverService.GetAll();
            //List<DriverViewModel> mappeddriverList = _mapper.Map<List<DriverViewModel>>(driverService);
            //return Json(new { data = mappeddriverList }, behavior: JsonRequestBehavior.AllowGet);
        }


        private void PopulateNational()
        {
            var List = _DecisionEndStopHandService.GetEmployeeList();
            var items = new List<SelectListItem>();
            List.ForEach(x =>
            {

                items.Add(new SelectListItem { Text = x.EmpID + " - " + x.EmpName, Value = x.EmpID.ToString() });
            });
            var itemsList = new SelectList(items, "Value", "Text");

            ViewData["Empolyee"] = itemsList;
        }
        private void PopulateOwner()
        {
            var List = _DecisionEndStopHandService.GetOwnerList();
            var items = new List<SelectListItem>();
            List.ForEach(x =>
            {
                items.Add(new SelectListItem { Text = x.OwnerId + " - " + x.OwnerName, Value = x.OwnerId.ToString() });
            });
            var itemsList = new SelectList(items, "Value", "Text");

            ViewData["OwnerList"] = itemsList;
        }

        public JsonResult AddDaysToDate(DateTime? date, int? days)
        {
            if (days == null)
            {
                days = 0;
            }
            
            var datee = _DecisionEndStopHandService.AddDaysToDate((DateTime)date, (int)days);

            return Json(datee, behavior: JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetEmployeeData(int? id)
        {
            var Data = _DecisionEndStopHandService.GetEmployeeDetailsById(id);
            return Json(Data, behavior: JsonRequestBehavior.AllowGet);
        }
        //private void PopulateNational()
        //{




        //    var List = _DecisionEndStopHandService.GetEmployeeList();
        //    var items = new SelectList(List, "EmpId", "EmpName");
        //    ViewData["Empolyee"] = items;
        //}

        //private void PopulateBranch()
        //{
        //    var Branch = _driverService.GetBranchList();
        //    var items = new SelectList(Branch, "Id", "BranchesName");
        //    ViewData["Branch"] = items;
        //}

        //private void PopulateLicenseType()
        //{
        //    var LicenseType = _driverService.GetLicenseTypeList();
        //    var items = new SelectList(LicenseType, "Id", "LicenseTypeNameName");
        //    ViewData["LicenseType"] = items;
        //}


        //[HttpPost]
        //public JsonResult CheckDriverNo(int? DriverNo)
        //{
        //    var checkDriverNo = _driverService.CheckDriverNo(DriverNo);

        //    if (checkDriverNo.Count() != 0)
        //    {
        //        return Json(false, JsonRequestBehavior.AllowGet);
        //    }
        //    else
        //    {
        //        return Json(true, JsonRequestBehavior.AllowGet);

        //    }
        //}



        //public ActionResult IndexReport()
        //{

        //    PopulateBranch();


        //    return View();
        //}



        //public CrystalReportPdfResult DriversReportPrint(string ids)
        //{

        //    int[] idsArray = ids.Split(',').Select(n => Convert.ToInt32(n)).ToArray();
        //    var vendor = _driverService.GetDriverForPrint(idsArray);
        //    List<DriverPrintViewModel> mappedinvestorsList = _mapper.Map<List<DriverPrintViewModel>>(vendor);
        //    string reportPath = Path.Combine(Server.MapPath("~/Reporting/Crystal"), "DriversReport.rpt");

        //    return new CrystalReportPdfResult(reportPath, mappedinvestorsList);
        //}

        //public JsonResult SearchDriversReport(DateTime? EndDate, int? BranchId)
        //{
        //    var reals = _driverService.GetDriverDetailsForPrintReport(EndDate, BranchId);
        //    return Json(new { data = reals }, behavior: JsonRequestBehavior.AllowGet);

        //}
        public ActionResult ClearData()
        {

            ModelState.Clear();

            PopulateNational();

            var DecisionEndStopHandViewModel = new DecisionEndStopHandViewModel();
            DecisionEndStopHandViewModel.DecisionEndStopHandID = (int)_DecisionEndStopHandService.GetMaxDecisionEndStopHandCode();

            return View(DecisionEndStopHandViewModel);
        }
        public ActionResult Print(int[] ids)
        {

            var vendor = _DecisionEndStopHandService.GetDecisionEndStopHandForPrint(ids);
            List<DecisionEndStopHandForPrintViewModel> mappedcarRptsList = _mapper.Map<List<DecisionEndStopHandForPrintViewModel>>(vendor);
            HRSystem.Web.Reporting.Crystal.DecisionEndStopHand driverRpt = new HRSystem.Web.Reporting.Crystal.DecisionEndStopHand();
            driverRpt.Load();
            driverRpt.SetDataSource(mappedcarRptsList);
            Response.Buffer = false;
            Response.ClearContent();
            Response.ClearHeaders();
            //driverRpt.SetParameterValue("CompanyName", globalData.CompanyName);
            //driverRpt.SetParameterValue("UserName", globalData.LoginName);
            Stream reportFile = driverRpt.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
            reportFile.Seek(0, SeekOrigin.Begin);
            return File(reportFile, "application/pdf");
        }
        #endregion
    }
}
