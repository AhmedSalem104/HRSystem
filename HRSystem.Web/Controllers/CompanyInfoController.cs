//using System;
//using System.Collections.Generic;
//using System.IO;
//using System.Linq;
//using System.Runtime.InteropServices.ComTypes;
//using System.Web;
//using System.Web.Mvc;
//using System.Web.UI;
//using AutoMapper;
//using Newtonsoft.Json;
//using HRSystem.Data;
//using HRSystem.Data.Entites;
//using HRSystem.Services;
//using HRSystem.Services.CompanyService;
//using HRSystem.Web.Infrastructure;
//using HRSystem.Web.Infrastructure.Resources;
//using HRSystem.Web.Infrastructure.ValidationMessage;
//using HRSystem.Web.Models;

//namespace RealEstate.Web.Controllers
//{
//    public class CompanyInfoController : BaseController
//    {

//        #region Fields
//        private readonly ICompanyService _companyService;

//        private readonly IMapper _mapper;
//        #endregion
      
//        #region Constructors
//        public CompanyInfoController(ICompanyService companyService, IMapper mapper)
//        {
//            _companyService = companyService;
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
//            //PopulateNationalities();
//            var companyInfoViewModel = new CompanyInfoViewModel();
//            //investorViewModel.investorCode = _investorService.GetMaxInvestorCode();

//            return View(companyInfoViewModel);
//        }
//        [HttpPost]
//        public ActionResult Create(CompanyInfoViewModel companyInfoViewModel)
//        {
//            if (ModelState.IsValid)
//            {

//                var companyInfo = _mapper.Map<CompanyInfoViewModel,CompanyInfo>(companyInfoViewModel);
//                _companyService.Insert(companyInfo);
//                AddMessage(this, "", "تم الاضافة بنجاح", MessageType.Success);
//                ModelState.Clear();
//            }
//            //PopulateNationalities();
//            companyInfoViewModel = new CompanyInfoViewModel();
//            //investorViewModel.investorCode = _investorService.GetMaxInvestorCode();
//            return View(companyInfoViewModel);
//        }
//        public ActionResult Edit()
//        {

//            var CompanyInfolist = _companyService.GetAll();
//            var count = CompanyInfolist.Count();

//            if (count != 0)
//            {
//                var CompanyInfoViewModel = new CompanyInfoViewModel();
//                var companyInfoo = _companyService.GetAll().FirstOrDefault();
//                CompanyInfoViewModel = _mapper.Map<CompanyInfo, CompanyInfoViewModel>(companyInfoo);
//                return View(CompanyInfoViewModel);
//            }
//            else {
//                var companyInfoViewModel = new CompanyInfoViewModel();
//                return View(companyInfoViewModel);
//            }
            
//        }
//        [HttpPost]
//        public ActionResult Edit(CompanyInfoViewModel companyInfoViewModel) 
//        {
//            var id = 0;


//            if (ModelState.IsValid)
//            {
               
//                var Id = companyInfoViewModel.Id;
//                if (Id != 0)
//                {
//                    var company = _mapper.Map<CompanyInfoViewModel, CompanyInfo>(companyInfoViewModel);

//                    _companyService.Update(company);
//                    id = company.Id;
//                    AddMessage(this, "", "تم التعديل بنجاح", MessageType.Success);
//            }
//            else
//            {

//                var companyInfo = _mapper.Map<CompanyInfoViewModel, CompanyInfo>(companyInfoViewModel);
//                _companyService.Insert(companyInfo);
//                AddMessage(this, "", "تم الاضافة بنجاح", MessageType.Success);

//            }


//        }

//            return RedirectToAction("Edit", new { id =id});
//        }
     
//        //public ActionResult Delete(int id)
//        //{
//        //    var isDeleted = _companyService.Delete(id);
//        //    return Json(new { ok = true }, JsonRequestBehavior.AllowGet);
//        //}
//        //public ActionResult Print(int id)
//        //{

//        //    var investor = _investorService.GetInvestorByIdForPrint(id);
//        //    List<InvestorPrintViewModel> mappedinvestorsList = _mapper.Map<List<InvestorPrintViewModel>>(investor);
//        //    Reports.Investors investorRpt = new Reports.Investors();
//        //    investorRpt.Load();
//        //    investorRpt.SetDataSource(mappedinvestorsList);
//        //    Response.Buffer = false;
//        //    Response.ClearContent();
//        //    Response.ClearHeaders();
//        //    Stream reportFile = investorRpt.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
//        //    reportFile.Seek(0, SeekOrigin.Begin);
//        //    return File(reportFile, "application/pdf");
//        //}
//        //public JsonResult GetInvestorsList()
//        //{
         
//        //    var investorsList = _investorService.GetAll();
         
           
//        //  List<InvestorViewModel>  mappedinvestorsList =_mapper.Map<List<InvestorViewModel>>(investorsList);
//        //    return Json(new { data = mappedinvestorsList }, behavior: JsonRequestBehavior.AllowGet);
//        //}
//        //private void PopulateNationalities()
//        //{
//        //    var nationalities = _investorService.GetNationalitiesList();

//        //   var items= new SelectList(nationalities, "NationalId", "NatName");

//        //    ViewData["Nationalities"] = items;
//        //}

//        #endregion
//    }
//}