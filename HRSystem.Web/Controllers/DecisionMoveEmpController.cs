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

using HRSystem.Services.DecisionMoveEmpService;
using HRSystem.Services.EmployeesService;
using HRSystem.Services.DecisionEmploymentService;




using HRSystem.Web.Infrastructure;
using HRSystem.Web.Infrastructure.Resources;
using HRSystem.Web.Infrastructure.ValidationMessage;
using HRSystem.Web.Models;
using HRSystem.Data.Entites.Payroll;

namespace HRSystem.Web.Controllers
{
    public class DecisionMoveEmpController : BaseController
    {
        #region Fields
        private readonly IDecisionMoveEmpService _decisionMoveEmpService;
        private readonly IEmployeesService _employeesService;
        private readonly IDecisionEmploymentService _decisionEmploymentService;
        //private readonly ILoggedUserService _loggedUserService;
        //GlobalData globalData = HelperMethods.globalData;
        private readonly IMapper _mapper;
        #endregion

        #region Constructors
        public DecisionMoveEmpController(IDecisionMoveEmpService DecisionMoveEmpService, IDecisionEmploymentService decisionEmploymentService, IEmployeesService employeesService, IMapper mapper)
        {
            _decisionMoveEmpService = DecisionMoveEmpService;
            _employeesService = employeesService;
            _decisionEmploymentService = decisionEmploymentService;



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
            PopulateFixedJob();
            PopulateDepartment();
            //PopulateBranch();
            //PopulateNational();

            Session["Value"] = "Create";

            //ViewBag.Year = DateTime.Now.Year;
            var DecisionMoveEmpViewModel = new DecisionMoveEmpViewModel();
            DecisionMoveEmpViewModel.DecisionMoveEmpID = (int)_decisionMoveEmpService.GetDecisionMoveEmpCode();

            return View(DecisionMoveEmpViewModel);
        }
        [HttpPost]
        public ActionResult Create(DecisionMoveEmpViewModel DecisionMoveEmpViewModel)
        {
            if (ModelState.IsValid)
            {

                var Decision = _mapper.Map<DecisionMoveEmpViewModel, DecisionMoveEmp>(DecisionMoveEmpViewModel);
                _decisionMoveEmpService.Insert(Decision);

                AddMessage(this, "", "تم الاضافة بنجاح", MessageType.Success);
                //ModelState.Clear();
            }
            PopulateNational();
            PopulateOwner();
            PopulateFixedJob();
            PopulateDepartment();
            //PopulateBranch();
            //PopulateNational();

            var id = _decisionMoveEmpService.GetMaxId();
            Session["Id"] = id;

            DecisionMoveEmpViewModel = new DecisionMoveEmpViewModel();
            DecisionMoveEmpViewModel.DecisionMoveEmpID = (int)_decisionMoveEmpService.GetDecisionMoveEmpCode();
            return View(DecisionMoveEmpViewModel);
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
            PopulateNational();
            PopulateOwner();
            PopulateFixedJob();
            PopulateDepartment();
            //PopulateBranch();
            //PopulateNational();

            Session["Value"] = "Edit";

            var DecisionMoveEmpViewModel = new DecisionMoveEmpViewModel();
            var DriverService = _decisionMoveEmpService.GetDecisionMoveEmpById(id);
            DecisionMoveEmpViewModel = _mapper.Map<DecisionMoveEmp, DecisionMoveEmpViewModel>(DriverService);
            return View(DecisionMoveEmpViewModel);
        }
        [HttpPost]
        public ActionResult Edit(DecisionMoveEmpViewModel DecisionMoveEmpViewModel)
        {
            var id = 0;

            if (ModelState.IsValid)
            {
                var driverService = _mapper.Map<DecisionMoveEmpViewModel, DecisionMoveEmp>(DecisionMoveEmpViewModel);
                _decisionMoveEmpService.Update(driverService);
                id = driverService.DecisionMoveEmpID;
                AddMessage(this, "", "تم التعديل بنجاح", MessageType.Success);
            }

            return RedirectToAction("Edit", new { id = id });
        }

        public ActionResult Delete(int id)
        {
            var isDeleted = _decisionMoveEmpService.Delete(id);
            return Json(new { ok = true }, JsonRequestBehavior.AllowGet);
        }

    

        public JsonResult GetDecisionMoveEmpList()
        {


            var List = _decisionMoveEmpService.GetAll();



            return Json(new { data = List }, behavior: JsonRequestBehavior.AllowGet);



            //var driverService = _driverService.GetAll();
            //List<DriverViewModel> mappeddriverList = _mapper.Map<List<DriverViewModel>>(driverService);
            //return Json(new { data = mappeddriverList }, behavior: JsonRequestBehavior.AllowGet);
        }


        private void PopulateOwner()
        {
            var List = _decisionEmploymentService.GetOwnerList();
            var items = new List<SelectListItem>();
            List.ForEach(x =>
            {
                items.Add(new SelectListItem { Text = x.OwnerId + " - " + x.OwnerName, Value = x.OwnerId.ToString() });
            });
            var itemsList = new SelectList(items, "Value", "Text");

            ViewData["OwnerList"] = itemsList;
        }

        private void PopulateDepartment()
        {
            var List = _decisionMoveEmpService.GetDepartmentList();
            var items = new List<SelectListItem>();
            List.ForEach(x =>
            {
                items.Add(new SelectListItem { Text = x.DepartmentID + " - " + x.DepartmentName, Value = x.DepartmentID.ToString() });
            });
            var itemsList = new SelectList(items, "Value", "Text");

            ViewData["DepartmentList"] = itemsList;
        }

        private void PopulateFixedJob()
        {
            var List = _decisionEmploymentService.GetFixedJobList();
            var items = new List<SelectListItem>();
            List.ForEach(x =>
            {
                items.Add(new SelectListItem { Text = x.JobSerial + " - " + x.ClassificationNo + " - " + x.JobName, Value = x.JobSerial.ToString() });
            });
            var itemsList = new SelectList(items, "Value", "Text");

            ViewData["FixedJob"] = itemsList;
        }
         

        private void PopulateNational()
        {
            var List = _employeesService.GetEmployeeList();
            var items = new List<SelectListItem>();
            List.ForEach(x =>
            {
                items.Add(new SelectListItem { Text = x.EmpID + " - " + x.IDNumber + " - " + x.EmpName, Value = x.EmpID.ToString() });
            });
            var itemsList = new SelectList(items, "Value", "Text");

            ViewData["Empolyee"] = itemsList;
        }


        public JsonResult GetEmployeeData(int? id)
        {
            var Data = _decisionMoveEmpService.GetEmployeeDetailsById(id);
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

            PopulateNational();

            var DecisionMoveEmpViewModel = new DecisionMoveEmpViewModel();
            DecisionMoveEmpViewModel.DecisionMoveEmpID = (int)_decisionMoveEmpService.GetDecisionMoveEmpCode();

            return View(DecisionMoveEmpViewModel);
        }
        public ActionResult Print(int[] ids)
        {

            var vendor = _decisionMoveEmpService.GetDecisionMoveEmpForPrint(ids);
            List<DecisionMoveEmpForPrintViewModel> mappedcarRptsList = _mapper.Map<List<DecisionMoveEmpForPrintViewModel>>(vendor);
            HRSystem.Web.Reporting.Crystal.DecisionMoveEmp driverRpt = new HRSystem.Web.Reporting.Crystal.DecisionMoveEmp();
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
