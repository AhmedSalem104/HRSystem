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

using HRSystem.Services.DecisionWorkersService;
using HRSystem.Services.DecisionLongLegationService;
using HRSystem.Services.EmployeesService;




using HRSystem.Web.Infrastructure;
using HRSystem.Web.Infrastructure.Resources;
using HRSystem.Web.Infrastructure.ValidationMessage;
using HRSystem.Web.Models;
using HRSystem.Data.Entites.Payroll;

namespace RealEstate.Web.Controllers
{
    public class DecisionWorkerController : BaseController
    {
        #region Fields
        private readonly IDecisionWorkersService  _decisionWorkersService ;
        private readonly IDecisionLongLegationService _decisionLongLegationService;
        private readonly IEmployeesService _employeesService;

        //private readonly ILoggedUserService _loggedUserService;
        //GlobalData globalData = HelperMethods.globalData;
        private readonly IMapper _mapper;
        #endregion

        #region Constructors
        public DecisionWorkerController(IDecisionWorkersService decisionWorkersService, IDecisionLongLegationService decisionLongLegationService, IEmployeesService employeesService, IMapper mapper)
        {
            _decisionWorkersService = decisionWorkersService;
            _decisionLongLegationService = decisionLongLegationService;
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
            PopulateEmployee();
            PopulateOwner();
            PopulateFixedJob();
            //PopulateBranch();
            //PopulateNational();

            Session["Value"] = "Create";

            //ViewBag.Year = DateTime.Now.Year;
            var DecisionWorkerViewModel = new DecisionWorkerViewModel();
            DecisionWorkerViewModel.DecisionWorkersID = (int)_decisionWorkersService.GetMaxDecisionWorkerCode();

            return View(DecisionWorkerViewModel);
        }
        [HttpPost]
        public ActionResult Create(DecisionWorkerViewModel DecisionWorkerViewModel)
        {
            if (ModelState.IsValid)
            {

                var Decision = _mapper.Map<DecisionWorkerViewModel, DecisionWorker>(DecisionWorkerViewModel);
                _decisionWorkersService.Insert(Decision);

                AddMessage(this, "", "تم الاضافة بنجاح", MessageType.Success);
                //ModelState.Clear();
            }
            PopulateEmployee();
            PopulateOwner();
            PopulateFixedJob();
            //PopulateBranch();
            //PopulateNational();

            var id = _decisionWorkersService.GetMaxId();
            Session["Id"] = id;

            DecisionWorkerViewModel = new DecisionWorkerViewModel();
            DecisionWorkerViewModel.DecisionWorkersID = (int)_decisionWorkersService.GetMaxDecisionWorkerCode();
            return View(DecisionWorkerViewModel);
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

        //    var driver = _decisionLongLegationService.GetAllDriversForPrint();
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
            PopulateEmployee();
            PopulateOwner();
            PopulateFixedJob();
            //PopulateBranch();
            //PopulateNational();


            Session["Value"] = "Edit";
            var DecisionWorkerViewModel = new DecisionWorkerViewModel();
            var DriverService = _decisionWorkersService.GetDecisionWorkerById(id);
            DecisionWorkerViewModel = _mapper.Map<DecisionWorker, DecisionWorkerViewModel>(DriverService);
            return View(DecisionWorkerViewModel);
        }
        [HttpPost]
        public ActionResult Edit(DecisionWorkerViewModel DecisionWorkerViewModel)
        {
            var id = 0;

            if (ModelState.IsValid)
            {
                var driverService = _mapper.Map<DecisionWorkerViewModel, DecisionWorker>(DecisionWorkerViewModel);
                _decisionWorkersService.Update(driverService);
                id = driverService.DecisionWorkersID;
                AddMessage(this, "", "تم التعديل بنجاح", MessageType.Success);
            }

            return RedirectToAction("Edit", new { id = id });
        }

        public ActionResult Delete(int id)
        {
            var isDeleted = _decisionWorkersService.Delete(id);
            return Json(new { ok = true }, JsonRequestBehavior.AllowGet);
        }

    

        public JsonResult GetDecisionWorkerList()
        {


            var List = _decisionWorkersService.GetAll();



            return Json(new { data = List }, behavior: JsonRequestBehavior.AllowGet);



            //var driverService = _driverService.GetAll();
            //List<DriverViewModel> mappeddriverList = _mapper.Map<List<DriverViewModel>>(driverService);
            //return Json(new { data = mappeddriverList }, behavior: JsonRequestBehavior.AllowGet);
        }


        private void PopulateEmployee()
        {
            var List = _employeesService.GetEmployeeList();
            var items = new List<SelectListItem>();
            List.ForEach(x =>
            {
                items.Add(new SelectListItem { Text = x.EmpID + " - " + x.IDNumber + " - " + x.EmpName  , Value = x.EmpID.ToString() });
            });
            var itemsList = new SelectList(items, "Value", "Text");

            ViewData["Empolyee"] = itemsList;
        }

        private void PopulateOwner()
        {
            var List = _decisionWorkersService.GetOwnerList();
            var items = new List<SelectListItem>();
            List.ForEach(x =>
            {
                items.Add(new SelectListItem { Text = x.OwnerId + " - " + x.OwnerName, Value = x.OwnerId.ToString() });
            });
            var itemsList = new SelectList(items, "Value", "Text");

            ViewData["OwnerList"] = itemsList;
        }

        private void PopulateFixedJob()
        {
            var List = _decisionWorkersService.GetFixedJobList();
            var items = new List<SelectListItem>();
            List.ForEach(x =>
            {
                items.Add(new SelectListItem { Text = x.JobSerial + " - " +x.ClassificationNo +" - " +  x.JobName, Value = x.JobSerial.ToString() });
            });
            var itemsList = new SelectList(items, "Value", "Text");

            ViewData["FixedJob"] = itemsList;
        }


        public JsonResult GetClassificationNoFromFixedJob(int? id)
        {
            var Data = _decisionWorkersService.FixedJobRow(id);
            var classficationValue = Data.FirstOrDefault().ClassificationNo;

            return Json(classficationValue, behavior: JsonRequestBehavior.AllowGet);

        }

        //public JsonResult AddDaysToDate(DateTime? date, int? days)
        //{
        //    if (days == null)
        //    {
        //        days = 0;
        //    }
        //    var datee = _decisionLongLegationService.AddDaysToDate((DateTime)date, (int)days);

        //    return Json(datee, behavior: JsonRequestBehavior.AllowGet);
        //}

        public JsonResult GetEmployeeData(int? id)
        {
            var Data = _decisionLongLegationService.GetEmployeeDetailsById(id);
            return Json(Data, behavior: JsonRequestBehavior.AllowGet);
        }
        //private void PopulateNational()
        //{




        //    var List = _decisionLongLegationService.GetEmployeeList();
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

            PopulateEmployee();
            PopulateOwner();
            PopulateFixedJob();
            //PopulateBranch();
            //PopulateNational();


            //ViewBag.Year = DateTime.Now.Year;
            var DecisionWorkerViewModel = new DecisionWorkerViewModel();
            DecisionWorkerViewModel.DecisionWorkersID = (int)_decisionWorkersService.GetMaxDecisionWorkerCode();

            return View(DecisionWorkerViewModel);
        }
        public ActionResult Print(int[] ids)
        {

            var vendor = _decisionWorkersService.GetDecisionWorkerForPrint(ids);
            List<DecisionWorkerForPrintViewModel> mappedcarRptsList = _mapper.Map<List<DecisionWorkerForPrintViewModel>>(vendor);
            HRSystem.Web.Reporting.Crystal.DecisionWorkers driverRpt = new HRSystem.Web.Reporting.Crystal.DecisionWorkers();
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
