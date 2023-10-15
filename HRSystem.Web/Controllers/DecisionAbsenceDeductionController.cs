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

using HRSystem.Services.DecisionAbsenceDeductionService;
using HRSystem.Services.EmployeesService;



using HRSystem.Web.Infrastructure;
using HRSystem.Web.Infrastructure.Resources;
using HRSystem.Web.Infrastructure.ValidationMessage;
using HRSystem.Web.Models;
using HRSystem.Data.Entites.Payroll;
using HRSystem.Services.DTO;
using static HRSystem.Web.Models.DecisionAbsenceDeductionViewModel;

namespace HRSystem.Web.Controllers
{
    public class DecisionAbsenceDeductionController : BaseController
    {
        #region Fields
        private readonly IDecisionAbsenceDeductionService _DecisionAbsenceDeductionService;
        private readonly IEmployeesService _employeesService;

        //private readonly ILoggedUserService _loggedUserService;
        //GlobalData globalData = HelperMethods.globalData;
        private readonly IMapper _mapper;
        #endregion

        #region Constructors
        public DecisionAbsenceDeductionController(IDecisionAbsenceDeductionService DecisionAbsenceDeductionService, IEmployeesService employeesService, IMapper mapper)
        {
            _DecisionAbsenceDeductionService = DecisionAbsenceDeductionService;
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
            PopulateDepartment();
            PopulateOwner();
            //PopulateBranch();
            //PopulateNational();
            ViewBag.Year = DateTime.Now.Year;
            Session["Value"] = "Create";
            //ViewBag.Year = DateTime.Now.Year;
            var DecisionAbsenceDeductionViewModel = new DecisionAbsenceDeductionViewModel();
            DecisionAbsenceDeductionViewModel.DecisionAbsenceDeductionID = (int)_DecisionAbsenceDeductionService.GetMaxDecisionAbsenceDeductionCode();
            DecisionAbsenceDeductionViewModel.IsAddH = 1;
            return View(DecisionAbsenceDeductionViewModel);
        }




        [HttpPost]
        public ActionResult Create(DecisionAbsenceDeductionViewModel DecisionAbsenceDeductionViewModel)
        {
            var Id = 0;
            if (ModelState.IsValid)
            {

                var Decision = _mapper.Map<DecisionAbsenceDeductionViewModel, DecisionAbsenceDeduction>(DecisionAbsenceDeductionViewModel);
                _DecisionAbsenceDeductionService.Insert(Decision);
                Id = Decision.DecisionAbsenceDeductionID;


                var DecisionAbsenceDeductionDetails = _mapper.Map<List<DecisionAbsenceDeductionFooter>>(DecisionAbsenceDeductionViewModel.EmpsList);
                _DecisionAbsenceDeductionService.InsertDecisionAbsenceDeductionD(DecisionAbsenceDeductionDetails, Id);

                AddMessage(this, "", "تم الاضافة بنجاح", MessageType.Success);
                //ModelState.Clear();
            }
            PopulateDepartment();
            PopulateOwner();
            //PopulateBranch();
            //PopulateNational();



            var id = _DecisionAbsenceDeductionService.GetMaxId();
            Session["Id"] = id;

            DecisionAbsenceDeductionViewModel = new DecisionAbsenceDeductionViewModel();
            DecisionAbsenceDeductionViewModel.DecisionAbsenceDeductionID = (int)_DecisionAbsenceDeductionService.GetMaxDecisionAbsenceDeductionCode();
            return View(DecisionAbsenceDeductionViewModel);
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

        //    var driver = _DecisionAbsenceDeductionService.GetAllDriversForPrint();
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
        [HttpGet]
        public ActionResult ShowPopUpEdit(int? EmpId, string EmpName, int? AbsenceDays, int? DeductMinutes, int? DeductHoursNo, int? DeductDays, string Description, int? row)
        {

            PopulateEmployee();
            if (AbsenceDays == null)
            {
                AbsenceDays = 0;
            }
            if (DeductMinutes == null)
            {
                DeductMinutes = 0;
            }
            if (DeductHoursNo == null)
            {
                DeductHoursNo = 0;
            }
            if (DeductDays == null)
            {
                DeductDays = 0;
            }
            if (row == null)
            {
                row = 0;
            }

            var user = new UsersList()
            {
                AbsenceDays = (int)AbsenceDays,
                DeductDays = (int)DeductDays,
                DeductHoursNo = (int)DeductHoursNo,
                DeductMinutes = (int)DeductMinutes,
                Description = Description,
                EmpName = EmpName,
                EmpId = (int)EmpId,
                row = row,
                IsAdd = 2,
                DecisionAbsenceDeductionID = 0,

            };


            return PartialView("_AddEmp", user);
        }

        public ActionResult Edit(int? id)
        {
            PopulateDepartment();
            PopulateOwner();
            PopulateEmployee();

            //PopulateBranch();
            //PopulateNational();

            Session["Value"] = "Edit";


            var decisionAbsenceDeductionViewModel = new DecisionAbsenceDeductionViewModel();
            var DriverService = _DecisionAbsenceDeductionService.GetDecisionAbsenceDeductionById(id);
            var DecisionAbsenceDeductionDList = _DecisionAbsenceDeductionService.GetDecisionAbsenceDeductionDetails(id);

            decisionAbsenceDeductionViewModel = _mapper.Map<DecisionAbsenceDeduction, DecisionAbsenceDeductionViewModel>(DriverService);


            List<UsersList> mappedDecisionAbsenceDeductionD = _mapper.Map<List<UsersList>>(DecisionAbsenceDeductionDList);
            decisionAbsenceDeductionViewModel.EmpsList = mappedDecisionAbsenceDeductionD;

            decisionAbsenceDeductionViewModel.IsAddH = 2;

            return View(decisionAbsenceDeductionViewModel);
        }
        [HttpPost]
        public ActionResult Edit(DecisionAbsenceDeductionViewModel DecisionAbsenceDeductionViewModel)
        {
            var id = 0;

            if (ModelState.IsValid)
            {
                var driverService = _mapper.Map<DecisionAbsenceDeductionViewModel, DecisionAbsenceDeduction>(DecisionAbsenceDeductionViewModel);
                _DecisionAbsenceDeductionService.Update(driverService);
                id = driverService.DecisionAbsenceDeductionID;



                var ListDetails = _mapper.Map<List<DecisionAbsenceDeductionFooter>>(DecisionAbsenceDeductionViewModel.EmpsList);
                _DecisionAbsenceDeductionService.UpdateDecisionAbsenceDeductionDetails(ListDetails, id);


                AddMessage(this, "", "تم التعديل بنجاح", MessageType.Success);
            }

            return RedirectToAction("Edit", new { id = id });
        }

        public ActionResult Delete(int id)
        {
            var isDeleted = _DecisionAbsenceDeductionService.Delete(id);
            return Json(new { ok = true }, JsonRequestBehavior.AllowGet);
        }



        public JsonResult GetDecisionAbsenceDeductionList()
        {


            var List = _DecisionAbsenceDeductionService.GetAll();



            return Json(new { data = List }, behavior: JsonRequestBehavior.AllowGet);



            //var driverService = _driverService.GetAll();
            //List<DriverViewModel> mappeddriverList = _mapper.Map<List<DriverViewModel>>(driverService);
            //return Json(new { data = mappeddriverList }, behavior: JsonRequestBehavior.AllowGet);
        }


        private void PopulateDepartment()
        {
            var List = _DecisionAbsenceDeductionService.GetDepartMentList();
            var items = new List<SelectListItem>();
            List.ForEach(x =>
            {
                items.Add(new SelectListItem { Text = x.DepartmentID + " - " + x.DepartmentName, Value = x.DepartmentID.ToString() });
            });
            var itemsList = new SelectList(items, "Value", "Text");

            ViewData["DepartmentList"] = itemsList;
        }
        private void PopulateOwner()
        {
            var List = _DecisionAbsenceDeductionService.GetOwnerList();
            var items = new List<SelectListItem>();
            List.ForEach(x =>
            {
                items.Add(new SelectListItem { Text = x.OwnerId + " - " + x.OwnerName, Value = x.OwnerId.ToString() });
            });
            var itemsList = new SelectList(items, "Value", "Text");

            ViewData["OwnerList"] = itemsList;
        }

        private void PopulateEmployee()
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
            var Data = _DecisionAbsenceDeductionService.GetEmployeeDetailsById(id);
            return Json(Data, behavior: JsonRequestBehavior.AllowGet);
        }


        public JsonResult AbsenceMonthNoChange(int? MonthNo)
        {
            if (MonthNo == null)
            {
                MonthNo = 0;
            }

            var datee = _DecisionAbsenceDeductionService.GetMonthName(MonthNo);

            return Json(datee, behavior: JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetEmployeeeNameInPopUp(int? EmpNo)
        {
            if (EmpNo == null)
            {
                EmpNo = 0;
            }

            var datee = _DecisionAbsenceDeductionService.GetEmployeeeName(EmpNo);

            return Json(datee, behavior: JsonRequestBehavior.AllowGet);
        }


        //private void PopulateNational()
        //{




        //    var List = _DecisionAbsenceDeductionService.GetEmployeeList();
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
            PopulateDepartment();
            PopulateOwner();


            Session["Value"] = "Create";

            ModelState.Clear();

            PopulateDepartment();

            var DecisionAbsenceDeductionViewModel = new DecisionAbsenceDeductionViewModel();
            DecisionAbsenceDeductionViewModel.DecisionAbsenceDeductionID = (int)_DecisionAbsenceDeductionService.GetMaxDecisionAbsenceDeductionCode();

            return View(DecisionAbsenceDeductionViewModel);
        }

        public ActionResult AddEmp()
        {


            PopulateEmployee();

            var DecisionAbsenceDeductionViewModel = new DecisionAbsenceDeductionViewModel();
            var UsersList = new UsersList();

            UsersList.IsAdd = 1;
            //DecisionAbsenceDeductionViewModel.DecisionAbsenceDeductionID = (int)_DecisionAbsenceDeductionService.GetMaxDecisionAbsenceDeductionCode();
            return PartialView("_AddEmp", UsersList);
            //return View(DecisionAbsenceDeductionViewModel);
        }
        //public ActionResult Print(int[] ids)
        //{

        //    var vendor = _DecisionAbsenceDeductionService.GetDecisionAbsenceDeductionForPrint(ids);
        //    List<DecisionAbsenceDeductionForPrintViewModel> mappedcarRptsList = _mapper.Map<List<DecisionAbsenceDeductionForPrintViewModel>>(vendor);
        //    HRSystem.Web.Reporting.Crystal.DecisionAbsenceDeduction driverRpt = new HRSystem.Web.Reporting.Crystal.DecisionAbsenceDeduction();
        //    driverRpt.Load();
        //    driverRpt.SetDataSource(mappedcarRptsList);
        //    Response.Buffer = false;
        //    Response.ClearContent();
        //    Response.ClearHeaders();
        //    //driverRpt.SetParameterValue("CompanyName", globalData.CompanyName);
        //    //driverRpt.SetParameterValue("UserName", globalData.LoginName);
        //    Stream reportFile = driverRpt.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
        //    reportFile.Seek(0, SeekOrigin.Begin);
        //    return File(reportFile, "application/pdf");
        //}
        #endregion
    }
}
