using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using AutoMapper;
using HRSystem.Data.Entites;
using HRSystem.Data.Entites.Payroll;
using HRSystem.Services;
using HRSystem.Services.CityService;

using HRSystem.Web.Infrastructure;
using HRSystem.Web.Infrastructure.ValidationMessage;
using HRSystem.Web.Models;

namespace HRSystem.Web.Controllers
{
    public class CityController : BaseController
    {
        #region Fields
        private readonly ICityService _cityService;

        private readonly IMapper _mapper;
        #endregion

        #region Constructors
        public CityController(ICityService cityService,IMapper mapper)
        {
            _cityService = cityService;

            _mapper = mapper;
        }
        #endregion

        #region Methods
        // GET: City
        public ActionResult Index()
        {
            //var CanAdd = _loggedUserService.InRole("City", "create", 1);
            //ViewBag.canAdd = CanAdd;

            //var CanEdit = _loggedUserService.InRole("City", "edit", 1);
            //ViewBag.canEdit = CanEdit;

            //var CanDelete = _loggedUserService.InRole("City", "delete", 1);
            //ViewBag.canDelete = CanDelete;

            return View();
        }
        
        public ActionResult Create()
        {
            var cityViewModel = new CityViewModel();
            //cityViewModel.CityId = (short)_cityService.GetMaxCityCode();
            
            return PartialView("_Create", cityViewModel);
        }
        [HttpPost]
        public ActionResult Create(CityViewModel cityViewModel)
        {
            if (ModelState.IsValid)
            {

               var city = _mapper.Map<CityViewModel, City>(cityViewModel);
                _cityService.Insert(city);

                AddMessage(this, "", "تم الاضافة بنجاح", MessageType.Success);
            }
                return Redirect(Request.UrlReferrer.PathAndQuery);
        }
        public ActionResult Edit(int? id)
        {
            var cityViewModel = new CityViewModel();
            var city = _cityService.GetCityById(id);
             cityViewModel = _mapper.Map<City, CityViewModel>(city);
          
            return PartialView("_Edit", cityViewModel);
        }
        [HttpPost]
        public ActionResult Edit(CityViewModel cityViewModel)
        {
            if (ModelState.IsValid)
            {
                var city = _mapper.Map<CityViewModel, City>(cityViewModel);
                _cityService.Update(city);
                AddMessage(this, "", "تم التعديل بنجاح", MessageType.Success);
            }
                return Redirect(Request.UrlReferrer.PathAndQuery);
        }
        public ActionResult Delete(int id)
        {
            var isDeleted = _cityService.Delete(id);
              return Json(new { ok = true}, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetCityList()
        {
            var cityList = _cityService.GetAll();
           
            return Json(new { data = cityList}, behavior: JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}