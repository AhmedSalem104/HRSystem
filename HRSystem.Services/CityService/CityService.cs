using HRSystem.Data;
using HRSystem.Data.Entites.Payroll;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.CityService
{
    public class CityService : ICityService
    {
        #region Fields
        readonly PayrollEntities _context;
        #endregion
        public CityService(PayrollEntities context)
        {
            _context = context;

        }

        public List<City> GetAll()
        {
            return _context.Cities.ToList();
        }

        public City GetCityById(int? id)
        {
            return _context.Cities.Where(c => c.CityId == id).FirstOrDefault();
        }

        public int? GetMaxCityCode()
        {
            return _context.Cities.Max(a => a.CityId) + 1;
        }
        public bool Insert(City city)
        {
            try
            { 
                city.Default = false;
                city.CityId = (short)GetMaxCityCode();
                _context.Insert_Update_Select_Delete_Cities(city.CityId,city.CityName,city.Default,"Insert");
                return true;

            }
            catch
            {
                return false;
            }
        }

        public bool Update(City city)
        {
            try
            {


                if (city == null)
                {
                    throw new ArgumentNullException("city");
                }
                city.Default = false;

                var GetId = _context.Cities.FirstOrDefault(m => m.CityId == city.CityId);

                if (GetId != null)
                {
                    _context.Insert_Update_Select_Delete_Cities(city.CityId, city.CityName, city.Default, "Update");
                }
                else 
                {
                
                }
              
                return true;

            }
            catch
            {
                return false;
            }

        }
        public bool Delete(int id)
        {
            try
            {

                var city = _context.Cities.FirstOrDefault(m => m.CityId == id);
                _context.Insert_Update_Select_Delete_Cities(city.CityId, city.CityName, city.Default, "Delete");
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
