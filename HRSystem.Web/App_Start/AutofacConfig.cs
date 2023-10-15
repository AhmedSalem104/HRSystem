using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Autofac;
using Autofac.Integration.Mvc;
using System.Web.Mvc;
using System.Reflection;
using AutoMapper;
using HRSystem.Data;
using HRSystem.Web.Infrastructure;
using HRSystem.Web.Mappings;
using HRSystem.Data.Entites.Payroll;



using HRSystem.Services.NationalityService;
using HRSystem.Services.BankService;
using HRSystem.Services.CityService;
using HRSystem.Services.PaySlipsService;
using HRSystem.Services.JobsService;
using HRSystem.Services.DecisionLongLegationService;
using HRSystem.Services.DecisionEmploymentService;
using HRSystem.Services.DecisionWorkersService;
using HRSystem.Services.DecisionChangeJobService;
using HRSystem.Services.EmployeesService;
using HRSystem.Services.DecisionMoveEmpService;
using HRSystem.Services.DecisionNewJobService;
using HRSystem.Services.DecisionStopHandService;
using HRSystem.Services.DecisionEndStopHandService;
using HRSystem.Services.DecisionAbsenceDeductionService;
using HRSystem.Services.BirthVacDecService;










namespace HRSystem.Web.App_Start
{
    public class AutofacConfig
    {
        public static void Configure()
        {
            var builder = new ContainerBuilder();

            //builder.RegisterType<TajDBEntities>();
            builder.RegisterType<PayrollEntities>()

           .InstancePerRequest();
        
            builder.RegisterType<NationalityService>().As<INationalityService>().InstancePerLifetimeScope();
            builder.RegisterType<BankService>().As<IBankService>().InstancePerLifetimeScope();
            builder.RegisterType<CityService>().As<ICityService>().InstancePerLifetimeScope();
            builder.RegisterType<EmployeesService>().As<IEmployeesService>().InstancePerLifetimeScope();
            builder.RegisterType<PaySlipsService>().As<IPaySlipsService>().InstancePerLifetimeScope();
            builder.RegisterType<JobsService>().As<IJobsService>().InstancePerLifetimeScope();
            builder.RegisterType<DecisionLongLegationService>().As<IDecisionLongLegationService>().InstancePerLifetimeScope();
            builder.RegisterType<DecisionEmploymentService>().As<IDecisionEmploymentService>().InstancePerLifetimeScope();
            builder.RegisterType<DecisionWorkersService>().As<IDecisionWorkersService>().InstancePerLifetimeScope();
            builder.RegisterType<DecisionChangeJobService>().As<IDecisionChangeJobService>().InstancePerLifetimeScope();
            builder.RegisterType<DecisionMoveEmpService>().As<IDecisionMoveEmpService>().InstancePerLifetimeScope();
            builder.RegisterType<DecisionNewJobService>().As<IDecisionNewJobService>().InstancePerLifetimeScope();
            builder.RegisterType<DecisionStopHandService>().As<IDecisionStopHandService>().InstancePerLifetimeScope();
            builder.RegisterType<DecisionEndStopHandService>().As<IDecisionEndStopHandService>().InstancePerLifetimeScope();
            builder.RegisterType<DecisionAbsenceDeductionService>().As<IDecisionAbsenceDeductionService>().InstancePerLifetimeScope();
            builder.RegisterType<BirthVacDecService>().As<IBirthVacDecService>().InstancePerLifetimeScope();

            

            builder.RegisterType<MACAddressHelper>().AsSelf().InstancePerLifetimeScope();

            builder.Register(c => new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new MappingProfile());

            })).AsSelf().SingleInstance();

            builder.Register(c => c.Resolve<MapperConfiguration>().CreateMapper(c.Resolve)).As<IMapper>().InstancePerLifetimeScope();
            builder.RegisterControllers(Assembly.GetExecutingAssembly());
            var container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));


    }
    }
}