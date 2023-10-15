using HRSystem.Data.Entites.Payroll;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.CityService
{
    public  interface ICityService
    {
        List<City> GetAll();
        int? GetMaxCityCode();
        City GetCityById(int? id);
        bool Insert(City city);
        bool Update(City city);
        bool Delete(int id);
     
    }
}
