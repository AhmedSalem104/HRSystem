using AutoMapper;
using HRSystem.Data;






using HRSystem.Web.Models;
using System;
using HRSystem.Data;
//using HRSystem.DataTajDB.Entites.TajDB;
using HRSystem.Data.Entites.Payroll;
using HRSystem.Services.DTO;
using static HRSystem.Web.Models.DecisionAbsenceDeductionViewModel;

namespace HRSystem.Web.Mappings
{
    public class MappingProfile : Profile
    {
       public MappingProfile()
        {

            CreateMap<Nationality, NationalViewModel>().ReverseMap();
            CreateMap<Bank, BankViewModel>().ReverseMap();
            CreateMap<City, CityViewModel>().ReverseMap();
            CreateMap<PaySlip, PaySlipViewModel>().ReverseMap();
            CreateMap<Job, JobViewModel>().ReverseMap();
            CreateMap<DecisionLongLegation, DecisionLongLegationViewModel>().ReverseMap();
            CreateMap<DecisionLongLegationDTO, DecisionLongLegationForPrintViewModel>().ReverseMap();
            CreateMap<DecisionEmployment, DecisionEmploymentViewModel>().ReverseMap();
            CreateMap<DecisionWorker, DecisionWorkerViewModel>().ReverseMap();
            CreateMap<DecisionChangeJob, DecisionChangeJobViewModel>().ReverseMap();
            CreateMap<DecisionMoveEmp, DecisionMoveEmpViewModel>().ReverseMap();
            CreateMap<GetDecisionEmploymentForPrint_Result, DecisionEmploymentForPrintViewModel>().ReverseMap();
            CreateMap<DecisionNewJob, DecisionNewJobViewModel>().ReverseMap();
            CreateMap<GetDecisionWorkersForPrint_Result, DecisionWorkerForPrintViewModel>().ReverseMap();
            CreateMap<GetDecisionChangeJobForPrint_Result, DecisionChangeJobForPrintViewModel>().ReverseMap();
            CreateMap<GetDecisionMoveEmpForPrint_Result, DecisionMoveEmpForPrintViewModel>().ReverseMap();
            CreateMap<DecisionNewJobDTO, DecisionNewJobForPrintViewModel>().ReverseMap();
            CreateMap<DecisionStopHand, DecisionStopHandViewModel>().ReverseMap();
            CreateMap<DecisionStopHandDTO, DecisionStopHandForPrintViewModel>().ReverseMap();
            CreateMap<DecisionEndStopHand, DecisionEndStopHandViewModel>().ReverseMap();
            CreateMap<DecisionEndStopHandDTO, DecisionEndStopHandForPrintViewModel>().ReverseMap();
            CreateMap<DecisionAbsenceDeduction, DecisionAbsenceDeductionViewModel>().ReverseMap();
            CreateMap<DecisionAbsenceDeductionFooter, UsersList>().ReverseMap();
            CreateMap<DecisionAbsenceDeductionDetialsDTO, UsersList>().ReverseMap();
            CreateMap<BirthVacDec, BirthVacDecViewModel>().ReverseMap();
            CreateMap<BirthVacDecDTO, BirthVacDecForPrintViewModel>().ReverseMap();









        }
    }
}