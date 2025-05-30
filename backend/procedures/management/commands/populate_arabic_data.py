from django.core.management.base import BaseCommand
from procedures.models import ProcedureCategory, ProcedureSubCategory, DocumentCategory, Procedure

class Command(BaseCommand):
    help = 'Populates the database with Arabic data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        Procedure.objects.all().delete()
        ProcedureSubCategory.objects.all().delete()
        ProcedureCategory.objects.all().delete()
        DocumentCategory.objects.all().delete()

        # Create categories
        categories_data = {
            'الهوية والوثائق': 'خدمات الهوية الوطنية والوثائق الرسمية',
            'التعليم': 'خدمات التعليم المدرسي والجامعي',
            'الصحة': 'خدمات الرعاية الصحية والتأمين',
            'العقارات': 'خدمات العقارات والبناء',
            'المركبات': 'خدمات تراخيص المركبات',
            'الخدمات المالية': 'خدمات البنوك والقروض'
        }

        created_categories = {}
        for name, description in categories_data.items():
            category = ProcedureCategory.objects.create(name=name, description=description)
            created_categories[name] = category
            self.stdout.write(f'Created category: {category.name}')

        # Create subcategories
        subcategories_data = {
            'الهوية والوثائق': [
                'الهوية الوطنية',
                'الجواز',
                'الجنسية',
                'الإقامة'
            ],
            'التعليم': [
                'التسجيل المدرسي',
                'التسجيل الجامعي',
                'المنح الدراسية'
            ],
            'الصحة': [
                'البطاقة الصحية',
                'التأمين الصحي',
                'الرعاية الصحية',
                'الصيدليات'
            ],
            'العقارات': [
                'ترخيص البناء',
                'تسجيل العقارات',
                'تأجير العقارات'
            ],
            'المركبات': [
                'ترخيص المركبات',
                'تسجيل المركبات',
                'فحص المركبات'
            ],
            'الخدمات المالية': [
                'الحسابات البنكية',
                'القروض',
                'البطاقات الائتمانية'
            ]
        }

        created_subcategories = []
        for category_name, subcategories in subcategories_data.items():
            category = created_categories[category_name]
            for subcategory_name in subcategories:
                subcategory = ProcedureSubCategory.objects.create(
                    category=category,
                    name=subcategory_name
                )
                created_subcategories.append(subcategory)
                self.stdout.write(f'Created subcategory: {subcategory.name}')

        # Create document categories
        document_categories = [
            'وثائق الهوية',
            'الشهادات',
            'العقود',
            'الفاتورة',
            'البيانات الشخصية'
        ]

        created_document_categories = []
        for name in document_categories:
            doc_category = DocumentCategory.objects.create(name=name)
            created_document_categories.append(doc_category)
            self.stdout.write(f'Created document category: {doc_category.name}')

        # Create procedures for each subcategory
        for subcategory in created_subcategories:
            if subcategory.name == 'الهوية الوطنية':
                procedures = [
                    {
                        'title': 'إصدار الهوية الوطنية',
                        'introduction': 'إجراءات الحصول على الهوية الوطنية للمواطنين',
                        'notes': 'يجب إحضار جميع المستندات المطلوبة مع نسخ مصورة منها',
                        'steps': [
                            {
                                'title': 'تقديم الطلب',
                                'description': 'التوجه إلى مركز خدمة المواطنين مع المستندات المطلوبة'
                            },
                            {
                                'title': 'التصوير',
                                'description': 'التصوير في المركز وتقديم البصمة'
                            },
                            {
                                'title': 'الدفع',
                                'description': 'دفع الرسوم المطلوبة'
                            },
                            {
                                'title': 'استلام الهوية',
                                'description': 'استلام الهوية بعد فترة الانتظار المحددة'
                            }
                        ],
                        'fees': 'رسوم إصدار الهوية: 100 ريال'
                    },
                    {
                        'title': 'تجديد الهوية الوطنية',
                        'introduction': 'إجراءات تجديد الهوية الوطنية المنتهية',
                        'notes': 'يجب إحضار الهوية القديمة وصورة شخصية حديثة',
                        'steps': [
                            {
                                'title': 'تقديم الطلب',
                                'description': 'التوجه إلى مركز خدمة المواطنين مع الهوية القديمة'
                            },
                            {
                                'title': 'التصوير',
                                'description': 'التصوير في المركز وتقديم البصمة'
                            },
                            {
                                'title': 'الدفع',
                                'description': 'دفع رسوم التجديد'
                            },
                            {
                                'title': 'استلام الهوية',
                                'description': 'استلام الهوية الجديدة'
                            }
                        ],
                        'fees': 'رسوم تجديد الهوية: 50 ريال'
                    }
                ]
            elif subcategory.name == 'الجواز':
                procedures = [
                    {
                        'title': 'إصدار جواز سفر جديد',
                        'introduction': 'إجراءات الحصول على جواز سفر جديد',
                        'notes': 'يجب أن تكون الهوية الوطنية سارية المفعول',
                        'steps': [
                            {
                                'title': 'تقديم الطلب',
                                'description': 'التوجه إلى مركز الجوازات مع المستندات المطلوبة'
                            },
                            {
                                'title': 'التصوير',
                                'description': 'التصوير في المركز وتقديم البصمة'
                            },
                            {
                                'title': 'الدفع',
                                'description': 'دفع رسوم إصدار الجواز'
                            },
                            {
                                'title': 'استلام الجواز',
                                'description': 'استلام الجواز بعد فترة الانتظار المحددة'
                            }
                        ],
                        'fees': 'رسوم إصدار الجواز: 300 ريال'
                    },
                    {
                        'title': 'تجديد جواز سفر',
                        'introduction': 'إجراءات تجديد جواز السفر المنتهي',
                        'notes': 'يجب إحضار الجواز القديم والهوية الوطنية',
                        'steps': [
                            {
                                'title': 'تقديم الطلب',
                                'description': 'التوجه إلى مركز الجوازات مع الجواز القديم'
                            },
                            {
                                'title': 'التصوير',
                                'description': 'التصوير في المركز وتقديم البصمة'
                            },
                            {
                                'title': 'الدفع',
                                'description': 'دفع رسوم التجديد'
                            },
                            {
                                'title': 'استلام الجواز',
                                'description': 'استلام الجواز الجديد'
                            }
                        ],
                        'fees': 'رسوم تجديد الجواز: 200 ريال'
                    }
                ]
            elif subcategory.name == 'الجنسية':
                procedures = [
                    {
                        'title': 'طلب الحصول على الجنسية',
                        'introduction': 'إجراءات التقديم للحصول على الجنسية',
                        'notes': 'يجب استيفاء جميع الشروط والمتطلبات',
                        'steps': [
                            {
                                'title': 'تقديم الطلب',
                                'description': 'التوجه إلى وزارة الداخلية مع المستندات المطلوبة'
                            },
                            {
                                'title': 'التحقق',
                                'description': 'التحقق من المستندات والمعلومات'
                            },
                            {
                                'title': 'الفحص الأمني',
                                'description': 'إجراء الفحص الأمني للمتقدم'
                            },
                            {
                                'title': 'الموافقة',
                                'description': 'انتظار الموافقة على الطلب'
                            }
                        ],
                        'fees': 'رسوم التقديم: 500 ريال'
                    },
                    {
                        'title': 'تجديد شهادة الجنسية',
                        'introduction': 'إجراءات تجديد شهادة الجنسية',
                        'notes': 'يجب إحضار الشهادة القديمة',
                        'steps': [
                            {
                                'title': 'تقديم الطلب',
                                'description': 'التوجه إلى وزارة الداخلية مع الشهادة القديمة'
                            },
                            {
                                'title': 'التحقق',
                                'description': 'التحقق من البيانات'
                            },
                            {
                                'title': 'الدفع',
                                'description': 'دفع رسوم التجديد'
                            },
                            {
                                'title': 'استلام الشهادة',
                                'description': 'استلام الشهادة الجديدة'
                            }
                        ],
                        'fees': 'رسوم التجديد: 200 ريال'
                    }
                ]
            elif subcategory.name == 'الإقامة':
                procedures = [
                    {
                        'title': 'تجديد الإقامة',
                        'introduction': 'إجراءات تجديد إقامة الوافدين',
                        'notes': 'يجب إحضار جواز السفر والإقامة القديمة',
                        'steps': [
                            {
                                'title': 'تقديم الطلب',
                                'description': 'التوجه إلى مركز الجوازات مع المستندات'
                            },
                            {
                                'title': 'الفحص الطبي',
                                'description': 'إجراء الفحص الطبي المطلوب'
                            },
                            {
                                'title': 'الدفع',
                                'description': 'دفع رسوم تجديد الإقامة'
                            },
                            {
                                'title': 'استلام الإقامة',
                                'description': 'استلام الإقامة الجديدة'
                            }
                        ],
                        'fees': 'رسوم تجديد الإقامة: 400 ريال'
                    },
                    {
                        'title': 'إصدار إقامة جديدة',
                        'introduction': 'إجراءات إصدار إقامة جديدة للوافدين',
                        'notes': 'يجب إحضار عقد العمل وجواز السفر',
                        'steps': [
                            {
                                'title': 'تقديم الطلب',
                                'description': 'التوجه إلى مركز الجوازات مع المستندات'
                            },
                            {
                                'title': 'الفحص الطبي',
                                'description': 'إجراء الفحص الطبي المطلوب'
                            },
                            {
                                'title': 'الدفع',
                                'description': 'دفع رسوم الإصدار'
                            },
                            {
                                'title': 'استلام الإقامة',
                                'description': 'استلام الإقامة الجديدة'
                            }
                        ],
                        'fees': 'رسوم الإصدار: 500 ريال'
                    }
                ]
            elif subcategory.name == 'التسجيل المدرسي':
                procedures = [
                    {
                        'title': 'تسجيل طالب جديد',
                        'introduction': 'إجراءات تسجيل طالب جديد في المدارس الحكومية',
                        'notes': 'يجب إحضار جميع المستندات المطلوبة مع نسخ مصورة منها',
                        'steps': [
                            {
                                'title': 'التسجيل المبدئي',
                                'description': 'التسجيل المبدئي عبر نظام نور'
                            },
                            {
                                'title': 'تقديم المستندات',
                                'description': 'تقديم المستندات المطلوبة للمدرسة'
                            },
                            {
                                'title': 'الدفع',
                                'description': 'دفع الرسوم المدرسية'
                            },
                            {
                                'title': 'استلام الكتب',
                                'description': 'استلام الكتب المدرسية والزي المدرسي'
                            }
                        ],
                        'fees': 'رسوم التسجيل: 200 ريال'
                    },
                    {
                        'title': 'نقل طالب',
                        'introduction': 'إجراءات نقل طالب من مدرسة إلى أخرى',
                        'notes': 'يجب إحضار كشف الدرجات والملف المدرسي',
                        'steps': [
                            {
                                'title': 'تقديم طلب النقل',
                                'description': 'تقديم طلب النقل عبر نظام نور'
                            },
                            {
                                'title': 'موافقة المدرسة',
                                'description': 'انتظار موافقة المدرسة المستهدفة'
                            },
                            {
                                'title': 'نقل الملف',
                                'description': 'نقل الملف المدرسي للمدرسة الجديدة'
                            },
                            {
                                'title': 'التسجيل',
                                'description': 'إكمال إجراءات التسجيل في المدرسة الجديدة'
                            }
                        ],
                        'fees': 'رسوم النقل: 50 ريال'
                    }
                ]
            elif subcategory.name == 'التسجيل الجامعي':
                procedures = [
                    {
                        'title': 'تسجيل طالب جامعي جديد',
                        'introduction': 'إجراءات القبول والتسجيل في الجامعات',
                        'notes': 'يجب إحضار شهادة الثانوية العامة وكشف الدرجات',
                        'steps': [
                            {
                                'title': 'التقديم المبدئي',
                                'description': 'التقديم عبر بوابة القبول الموحد'
                            },
                            {
                                'title': 'اختبارات القبول',
                                'description': 'إجراء اختبارات القبول المطلوبة'
                            },
                            {
                                'title': 'الدفع',
                                'description': 'دفع رسوم التسجيل'
                            },
                            {
                                'title': 'التسجيل النهائي',
                                'description': 'إكمال إجراءات التسجيل في الجامعة'
                            }
                        ],
                        'fees': 'رسوم التسجيل: 500 ريال'
                    },
                    {
                        'title': 'تسجيل مقررات',
                        'introduction': 'إجراءات تسجيل المقررات الدراسية للفصل الدراسي',
                        'notes': 'يجب مراجعة الخطة الدراسية',
                        'steps': [
                            {
                                'title': 'المراجعة',
                                'description': 'مراجعة المقررات المتاحة'
                            },
                            {
                                'title': 'التسجيل',
                                'description': 'تسجيل المقررات المطلوبة'
                            },
                            {
                                'title': 'الدفع',
                                'description': 'دفع رسوم المقررات'
                            },
                            {
                                'title': 'التأكيد',
                                'description': 'تأكيد التسجيل'
                            }
                        ],
                        'fees': 'رسوم التسجيل: 200 ريال'
                    }
                ]
            elif subcategory.name == 'المنح الدراسية':
                procedures = [
                    {
                        'title': 'طلب منحة دراسية',
                        'introduction': 'إجراءات التقديم على المنح الدراسية',
                        'notes': 'يجب استيفاء شروط المنحة المطلوبة',
                        'steps': [
                            {
                                'title': 'تقديم الطلب',
                                'description': 'تقديم طلب المنحة مع المستندات المطلوبة'
                            },
                            {
                                'title': 'التحقق',
                                'description': 'التحقق من المستندات والمعلومات'
                            },
                            {
                                'title': 'المقابلة',
                                'description': 'إجراء مقابلة شخصية'
                            },
                            {
                                'title': 'الموافقة',
                                'description': 'انتظار قرار الموافقة على المنحة'
                            }
                        ],
                        'fees': 'رسوم التقديم: 100 ريال'
                    },
                    {
                        'title': 'تجديد المنحة',
                        'introduction': 'إجراءات تجديد المنحة الدراسية',
                        'notes': 'يجب استيفاء شروط التجديد',
                        'steps': [
                            {
                                'title': 'تقديم الطلب',
                                'description': 'تقديم طلب تجديد المنحة'
                            },
                            {
                                'title': 'التحقق',
                                'description': 'التحقق من المستندات'
                            },
                            {
                                'title': 'التقييم',
                                'description': 'تقييم الأداء الأكاديمي'
                            },
                            {
                                'title': 'الموافقة',
                                'description': 'انتظار قرار التجديد'
                            }
                        ],
                        'fees': 'رسوم التجديد: 50 ريال'
                    }
                ]
            elif subcategory.name == 'البطاقة الصحية':
                procedures = [
                    {
                        'title': 'إصدار البطاقة الصحية',
                        'introduction': 'إجراءات الحصول على البطاقة الصحية',
                        'notes': 'يجب إحضار صورة شخصية حديثة',
                        'steps': [
                            {
                                'title': 'تقديم الطلب',
                                'description': 'التوجه إلى المركز الصحي مع المستندات المطلوبة'
                            },
                            {
                                'title': 'الفحص الطبي',
                                'description': 'إجراء الفحص الطبي المطلوب'
                            },
                            {
                                'title': 'الدفع',
                                'description': 'دفع رسوم إصدار البطاقة'
                            },
                            {
                                'title': 'استلام البطاقة',
                                'description': 'استلام البطاقة الصحية'
                            }
                        ],
                        'fees': 'رسوم إصدار البطاقة: 150 ريال'
                    },
                    {
                        'title': 'تجديد البطاقة الصحية',
                        'introduction': 'إجراءات تجديد البطاقة الصحية المنتهية',
                        'notes': 'يجب إحضار البطاقة القديمة',
                        'steps': [
                            {
                                'title': 'تقديم الطلب',
                                'description': 'التوجه إلى المركز الصحي مع البطاقة القديمة'
                            },
                            {
                                'title': 'الفحص الطبي',
                                'description': 'إجراء الفحص الطبي المطلوب'
                            },
                            {
                                'title': 'الدفع',
                                'description': 'دفع رسوم التجديد'
                            },
                            {
                                'title': 'استلام البطاقة',
                                'description': 'استلام البطاقة الجديدة'
                            }
                        ],
                        'fees': 'رسوم التجديد: 100 ريال'
                    }
                ]
            elif subcategory.name == 'التأمين الصحي':
                procedures = [
                    {
                        'title': 'تسجيل في التأمين الصحي',
                        'introduction': 'إجراءات التسجيل في التأمين الصحي',
                        'notes': 'يجب إحضار البطاقة الصحية والهوية الوطنية',
                        'steps': [
                            {
                                'title': 'اختيار الخطة',
                                'description': 'اختيار خطة التأمين المناسبة'
                            },
                            {
                                'title': 'تقديم الطلب',
                                'description': 'تقديم طلب التسجيل مع المستندات'
                            },
                            {
                                'title': 'الدفع',
                                'description': 'دفع رسوم التأمين'
                            },
                            {
                                'title': 'تفعيل التأمين',
                                'description': 'تفعيل التأمين الصحي'
                            }
                        ],
                        'fees': 'رسوم التسجيل: 200 ريال'
                    },
                    {
                        'title': 'تجديد التأمين الصحي',
                        'introduction': 'إجراءات تجديد التأمين الصحي',
                        'notes': 'يجب إحضار البطاقة الصحية',
                        'steps': [
                            {
                                'title': 'تقديم الطلب',
                                'description': 'تقديم طلب تجديد التأمين'
                            },
                            {
                                'title': 'التحقق',
                                'description': 'التحقق من البيانات'
                            },
                            {
                                'title': 'الدفع',
                                'description': 'دفع رسوم التجديد'
                            },
                            {
                                'title': 'تفعيل التجديد',
                                'description': 'تفعيل تجديد التأمين'
                            }
                        ],
                        'fees': 'رسوم التجديد: 150 ريال'
                    }
                ]
            elif subcategory.name == 'الرعاية الصحية':
                procedures = [
                    {
                        'title': 'تسجيل في الرعاية الصحية',
                        'introduction': 'إجراءات التسجيل في خدمات الرعاية الصحية',
                        'notes': 'يجب إحضار البطاقة الصحية',
                        'steps': [
                            {
                                'title': 'تقديم الطلب',
                                'description': 'تقديم طلب التسجيل'
                            },
                            {
                                'title': 'التحقق',
                                'description': 'التحقق من البيانات'
                            },
                            {
                                'title': 'الدفع',
                                'description': 'دفع رسوم التسجيل'
                            },
                            {
                                'title': 'التفعيل',
                                'description': 'تفعيل خدمات الرعاية'
                            }
                        ],
                        'fees': 'رسوم التسجيل: 200 ريال'
                    },
                    {
                        'title': 'تجديد الرعاية الصحية',
                        'introduction': 'إجراءات تجديد خدمات الرعاية الصحية',
                        'notes': 'يجب إحضار البطاقة الصحية',
                        'steps': [
                            {
                                'title': 'تقديم الطلب',
                                'description': 'تقديم طلب التجديد'
                            },
                            {
                                'title': 'التحقق',
                                'description': 'التحقق من البيانات'
                            },
                            {
                                'title': 'الدفع',
                                'description': 'دفع رسوم التجديد'
                            },
                            {
                                'title': 'التفعيل',
                                'description': 'تفعيل تجديد الخدمات'
                            }
                        ],
                        'fees': 'رسوم التجديد: 150 ريال'
                    }
                ]
            elif subcategory.name == 'الصيدليات':
                procedures = [
                    {
                        'title': 'ترخيص صيدلية جديدة',
                        'introduction': 'إجراءات ترخيص صيدلية جديدة',
                        'notes': 'يجب إحضار المستندات المطلوبة',
                        'steps': [
                            {
                                'title': 'تقديم الطلب',
                                'description': 'تقديم طلب الترخيص مع المستندات'
                            },
                            {
                                'title': 'الفحص الميداني',
                                'description': 'إجراء الفحص الميداني للموقع'
                            },
                            {
                                'title': 'الدفع',
                                'description': 'دفع رسوم الترخيص'
                            },
                            {
                                'title': 'استلام الترخيص',
                                'description': 'استلام ترخيص الصيدلية'
                            }
                        ],
                        'fees': 'رسوم الترخيص: 1000 ريال'
                    },
                    {
                        'title': 'تجديد ترخيص الصيدلية',
                        'introduction': 'إجراءات تجديد ترخيص الصيدلية',
                        'notes': 'يجب إحضار الترخيص القديم',
                        'steps': [
                            {
                                'title': 'تقديم الطلب',
                                'description': 'تقديم طلب التجديد'
                            },
                            {
                                'title': 'الفحص الميداني',
                                'description': 'إجراء الفحص الميداني'
                            },
                            {
                                'title': 'الدفع',
                                'description': 'دفع رسوم التجديد'
                            },
                            {
                                'title': 'استلام الترخيص',
                                'description': 'استلام الترخيص الجديد'
                            }
                        ],
                        'fees': 'رسوم التجديد: 500 ريال'
                    }
                ]
            elif subcategory.name == 'ترخيص البناء':
                procedures = [
                    {
                        'title': 'ترخيص بناء جديد',
                        'introduction': 'إجراءات الحصول على ترخيص بناء جديد',
                        'notes': 'يجب إحضار المخططات الهندسية',
                        'steps': [
                            {
                                'title': 'تقديم الطلب',
                                'description': 'تقديم طلب الترخيص مع المخططات'
                            },
                            {
                                'title': 'الفحص الميداني',
                                'description': 'إجراء الفحص الميداني للموقع'
                            },
                            {
                                'title': 'الدفع',
                                'description': 'دفع رسوم الترخيص'
                            },
                            {
                                'title': 'استلام الترخيص',
                                'description': 'استلام ترخيص البناء'
                            }
                        ],
                        'fees': 'رسوم الترخيص: 2000 ريال'
                    },
                    {
                        'title': 'تجديد ترخيص البناء',
                        'introduction': 'إجراءات تجديد ترخيص البناء',
                        'notes': 'يجب إحضار الترخيص القديم',
                        'steps': [
                            {
                                'title': 'تقديم الطلب',
                                'description': 'تقديم طلب التجديد'
                            },
                            {
                                'title': 'الفحص الميداني',
                                'description': 'إجراء الفحص الميداني'
                            },
                            {
                                'title': 'الدفع',
                                'description': 'دفع رسوم التجديد'
                            },
                            {
                                'title': 'استلام الترخيص',
                                'description': 'استلام الترخيص الجديد'
                            }
                        ],
                        'fees': 'رسوم التجديد: 1000 ريال'
                    }
                ]
            elif subcategory.name == 'ترخيص المركبات':
                procedures = [
                    {
                        'title': 'ترخيص مركبة جديدة',
                        'introduction': 'إجراءات ترخيص مركبة جديدة',
                        'notes': 'يجب إحضار فاتورة الشراء',
                        'steps': [
                            {
                                'title': 'تقديم الطلب',
                                'description': 'تقديم طلب الترخيص مع المستندات'
                            },
                            {
                                'title': 'الفحص الفني',
                                'description': 'إجراء الفحص الفني للمركبة'
                            },
                            {
                                'title': 'الدفع',
                                'description': 'دفع رسوم الترخيص'
                            },
                            {
                                'title': 'استلام الترخيص',
                                'description': 'استلام ترخيص المركبة'
                            }
                        ],
                        'fees': 'رسوم الترخيص: 500 ريال'
                    },
                    {
                        'title': 'تجديد ترخيص المركبة',
                        'introduction': 'إجراءات تجديد ترخيص المركبة',
                        'notes': 'يجب إحضار الترخيص القديم',
                        'steps': [
                            {
                                'title': 'تقديم الطلب',
                                'description': 'تقديم طلب التجديد'
                            },
                            {
                                'title': 'الفحص الفني',
                                'description': 'إجراء الفحص الفني'
                            },
                            {
                                'title': 'الدفع',
                                'description': 'دفع رسوم التجديد'
                            },
                            {
                                'title': 'استلام الترخيص',
                                'description': 'استلام الترخيص الجديد'
                            }
                        ],
                        'fees': 'رسوم التجديد: 300 ريال'
                    }
                ]
            elif subcategory.name == 'الحسابات البنكية':
                procedures = [
                    {
                        'title': 'فتح حساب بنكي جديد',
                        'introduction': 'إجراءات فتح حساب بنكي جديد',
                        'notes': 'يجب إحضار الهوية الوطنية',
                        'steps': [
                            {
                                'title': 'تقديم الطلب',
                                'description': 'تقديم طلب فتح الحساب مع المستندات'
                            },
                            {
                                'title': 'التحقق',
                                'description': 'التحقق من البيانات'
                            },
                            {
                                'title': 'الدفع',
                                'description': 'دفع رسوم فتح الحساب'
                            },
                            {
                                'title': 'التفعيل',
                                'description': 'تفعيل الحساب البنكي'
                            }
                        ],
                        'fees': 'رسوم فتح الحساب: 100 ريال'
                    },
                    {
                        'title': 'إغلاق حساب بنكي',
                        'introduction': 'إجراءات إغلاق حساب بنكي',
                        'notes': 'يجب إحضار البطاقة البنكية',
                        'steps': [
                            {
                                'title': 'تقديم الطلب',
                                'description': 'تقديم طلب إغلاق الحساب'
                            },
                            {
                                'title': 'التحقق',
                                'description': 'التحقق من البيانات'
                            },
                            {
                                'title': 'الدفع',
                                'description': 'دفع رسوم الإغلاق'
                            },
                            {
                                'title': 'التأكيد',
                                'description': 'تأكيد إغلاق الحساب'
                            }
                        ],
                        'fees': 'رسوم الإغلاق: 50 ريال'
                    }
                ]
            elif subcategory.name == 'القروض':
                procedures = [
                    {
                        'title': 'طلب قرض بنكي',
                        'introduction': 'إجراءات طلب قرض بنكي',
                        'notes': 'يجب إحضار المستندات المطلوبة',
                        'steps': [
                            {
                                'title': 'تقديم الطلب',
                                'description': 'تقديم طلب القرض مع المستندات'
                            },
                            {
                                'title': 'التحقق',
                                'description': 'التحقق من المستندات'
                            },
                            {
                                'title': 'الموافقة',
                                'description': 'انتظار موافقة القرض'
                            },
                            {
                                'title': 'التفعيل',
                                'description': 'تفعيل القرض'
                            }
                        ],
                        'fees': 'رسوم الطلب: 200 ريال'
                    },
                    {
                        'title': 'تجديد القرض',
                        'introduction': 'إجراءات تجديد القرض البنكي',
                        'notes': 'يجب إحضار المستندات المطلوبة',
                        'steps': [
                            {
                                'title': 'تقديم الطلب',
                                'description': 'تقديم طلب تجديد القرض'
                            },
                            {
                                'title': 'التحقق',
                                'description': 'التحقق من المستندات'
                            },
                            {
                                'title': 'الموافقة',
                                'description': 'انتظار موافقة التجديد'
                            },
                            {
                                'title': 'التفعيل',
                                'description': 'تفعيل تجديد القرض'
                            }
                        ],
                        'fees': 'رسوم التجديد: 100 ريال'
                    }
                ]
            else:
                procedures = []

            # Create procedures for the subcategory
            for procedure_data in procedures:
                procedure = Procedure.objects.create(
                    subcategory=subcategory,
                    title=procedure_data['title'],
                    introduction=procedure_data['introduction'],
                    notes=procedure_data['notes'],
                    steps=procedure_data['steps'],
                    fees=procedure_data['fees']
                )
                self.stdout.write(f'Created procedure: {procedure.title}')

        self.stdout.write(self.style.SUCCESS('Successfully populated database with Arabic data')) 