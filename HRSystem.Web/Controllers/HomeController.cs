using AutoMapper;
using HRSystem.Data.Entites;
using HRSystem.Web.Infrastructure;
using HRSystem.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HRSystem.Web.Controllers
{
    public class HomeController : Controller
    {


        #region Fields
        //private readonly ICarService _carService;

        //private readonly IEquipmentService _equipmentService;
        //private readonly ICarDeliveryrService _carDeliveryrService;

        private readonly IMapper _mapper;
        #endregion

        #region Constructors
        public HomeController(IMapper mapper /*ICarService carService, IEquipmentService equipmentService, ICarDeliveryrService carDeliveryrService*/)
        {
            //_carService = carService;
            //_equipmentService = equipmentService;
            //_carDeliveryrService = carDeliveryrService;

            _mapper = mapper;
        }
        #endregion
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        //public PartialViewResult CarsCount()
        //{
        //    var carsCountViewModel = new HomeViewModel();
        //    var carsCount = _carService.GetCarsCount();
        //    carsCountViewModel = _mapper.Map<CarsCountDto, HomeViewModel>(carsCount);
        //    return PartialView("_CarsCount",carsCountViewModel);
        //}
        //public PartialViewResult MachinesCount()
        //{
        //    var machinesCountViewModel = new HomeViewModel();
        //    var machinesCount = _equipmentService.GetMachinesCount();
        //    machinesCountViewModel = _mapper.Map<MachinesCountDto, HomeViewModel>(machinesCount);
        //    return PartialView("_MachinesCount", machinesCountViewModel);
        //}
        //public PartialViewResult CarsDeliveredCount()
        //{
        //    var carsCountViewModel = new HomeViewModel();
        //    var deliverdCars = _carDeliveryrService.GetDeliverdCarsCount();
        //    carsCountViewModel = _mapper.Map<CarsCountDto, HomeViewModel>(deliverdCars);
        //    return PartialView("_CarsDeliveredCount", carsCountViewModel);
        //}
        //public PartialViewResult MachinesDeliveredCount()
        //{
        //    var machinesCountViewModel = new HomeViewModel();
        //    var machinesCount = _carDeliveryrService.GetDeliverdMachinesCount();
        //    machinesCountViewModel = _mapper.Map<MachinesCountDto, HomeViewModel>(machinesCount);
        //    return PartialView("_MachinesDeliveredCount", machinesCountViewModel);
        //}
    }
}