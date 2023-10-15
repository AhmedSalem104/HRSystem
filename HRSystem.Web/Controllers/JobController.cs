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
using HRSystem.Services.JobsService;
using HRSystem.Web.Infrastructure.ValidationMessage;
using HRSystem.Web.Models;
using HRSystem.Data.Entites;
using HRSystem.Data.Entites.Payroll;
//using HRSystem.Services.SecurityService;


namespace HRSystem.Web.Controllers
{
    public class JobController : BaseController
    {
        #region Fields
        private readonly IJobsService _jobsService;
        //private readonly ILoggedUserService _loggedUserService;
        //GlobalData globalData = HelperMethods.globalData;
        private readonly IMapper _mapper;
        #endregion

        #region Constructors
        public JobController(IJobsService jobsService,/*, ILoggedUserService loggedUserService, */IMapper mapper)
        {
            _jobsService = jobsService;
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
            var JobViewModel = new JobViewModel();
            //JobViewModel.JobID = (byte)_jobsService.GetMaxJobCode();

            return PartialView("_Create", JobViewModel);
        }
        [HttpPost]
        public ActionResult Create(JobViewModel JobViewModel)
        {
            if (ModelState.IsValid)
            {
                var x = JobViewModel.DegreeCheckValueFromEnums;
                if (x == 1)
                {
                    JobViewModel.DegreeCheck = true;
                }
                else
                {
                    JobViewModel.DegreeCheck = false;


                }
                var job = _mapper.Map<JobViewModel, Job>(JobViewModel);
                
                _jobsService.Insert(job);

                AddMessage(this, "", "تم الاضافة بنجاح", MessageType.Success);
            }
                return Redirect(Request.UrlReferrer.PathAndQuery);
        }
        public ActionResult Edit(int? id)
        {
            var JobViewModel = new JobViewModel();
            var job = _jobsService.GetJobById(id);
          
            JobViewModel = _mapper.Map<Job, JobViewModel>(job);
            var x = job.DegreeCheck;
            if (x == true)
            {
                JobViewModel.DegreeCheckValueFromEnums = 1;
            }
            else
            {
                JobViewModel.DegreeCheckValueFromEnums = 2;


            }
            return PartialView("_Edit", JobViewModel);
        }
        [HttpPost]
        public ActionResult Edit(JobViewModel JobViewModel)
        {
            if (ModelState.IsValid)
            {
                var x = JobViewModel.DegreeCheckValueFromEnums;
                if (x == 1)
                {
                    JobViewModel.DegreeCheck = true;
                }
                else
                {
                    JobViewModel.DegreeCheck = false;


                }
                var job = _mapper.Map<JobViewModel, Job>(JobViewModel);
              
                _jobsService.Update(job);
                AddMessage(this, "", "تم التعديل بنجاح", MessageType.Success);
            }
                return Redirect(Request.UrlReferrer.PathAndQuery);
        }
        public ActionResult Delete(int id)
        {
            var isDeleted = _jobsService.Delete(id);
              return Json(new { ok = true}, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetJobList()
        {
            var Joblist = _jobsService.GetAll();
            return Json(new { data = Joblist }, behavior: JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult CheckBankNo(int? JobNo)
        {
            var checkcode = _jobsService.CheckJobNo(JobNo);

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