using HRSystem.Data;
using HRSystem.Data.Entites.Payroll;
//using HRSystem.Data.Entites;
using HRSystem.Services;
using HRSystem.Services.PaySlipsService;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.PaySlipsService
{
    public class PaySlipsService : IPaySlipsService
    {
        #region Fields
        readonly PayrollEntities _context;
        #endregion
        public PaySlipsService(PayrollEntities context)
        {
            _context = context;
        }

        public List<PaySlip> GetAll()
        {
            _context.Configuration.ProxyCreationEnabled = false;
            return _context.PaySlips.ToList();
        }

        public PaySlip GetPaySlipById(int? id)
        {
            return _context.PaySlips.Where(c => c.PaySlipID == id).FirstOrDefault();
        }

        public short? GetMaxPaySlipCode()
        {

            var CodeNotNull = _context.PaySlips.Max(a => a.PaySlipID);
            if (CodeNotNull != null)
            {
                return ((short?)(CodeNotNull + 1));
            }
            else
            {
                var CodeNull = 1;
                return ((short?)CodeNull);

            }
        }


        public bool Insert(PaySlip PaySlip)
        {
            try
            {
                PaySlip.PaySlipTypeID = 1;
                PaySlip.PaySlipID = (byte)GetMaxPaySlipCode();
                _context.PaySlips.Add(PaySlip);
                _context.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                var v = e.Message;
                return false;
            }
        }

        public bool Update(PaySlip PaySlip)
        {
            try
            {


                if (PaySlip == null)
                {
                    throw new ArgumentNullException("PaySlip");
                }
                PaySlip.PaySlipTypeID = 1;

                _context.Entry(PaySlip).State = EntityState.Detached;
                _context.Entry(PaySlip).State = EntityState.Modified;
                _context.SaveChanges();
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

                var PaySlip = _context.PaySlips.FirstOrDefault(m => m.PaySlipID == id);
                //_context.Entry(color).State = EntityState.Modified;
                _context.Entry(PaySlip).State = EntityState.Deleted;
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }


        public List<PaySlip> CheckPaySlipNo(int? PaySlipNo)
        {
            return _context.PaySlips.Where(a => a.PaySlipID == PaySlipNo).ToList();
        }


    }
}
