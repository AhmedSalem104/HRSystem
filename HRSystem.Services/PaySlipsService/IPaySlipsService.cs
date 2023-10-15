using HRSystem.Data;
using HRSystem.Data.Entites.Payroll;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.PaySlipsService
{
    public  interface IPaySlipsService
    {
        List<PaySlip> GetAll();
        short? GetMaxPaySlipCode();

        List<PaySlip> CheckPaySlipNo(int? PaySlipNo);
        PaySlip GetPaySlipById(int? id);
        bool Insert(PaySlip PaySlip);
        bool Update(PaySlip PaySlip);
        bool Delete(int id);

     
    }
}
