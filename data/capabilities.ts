import { Capability } from "@/types";

export const capabilities: Capability[] = [
  {
    id: "research-engagement",
    name: "Research-related Engagement",
    description: "Engage interest-holders to build research impact, exchange knowledge, and create opportunities.",
    levels: [
      {
        level: "FOUNDATION",
        bulletPoints: [
          "Understand the importance of engaging respectfully with Māori and Indigenous communities in research contexts, including the ability to identify key stakeholders and understand their roles in the research ecosystem.",
          "Identify key interest-holders to a research project or initiative and their roles in the research ecosystem.",
          "Respond to known partners in a timely, respectful, and culturally appropriate manner.",
          "Share research findings with relevant audiences as instructed.",
          "Maintain accurate records of interest-holder interactions and follow-up actions.",
          "Contribute to preparation efforts for interest-holder engagement activities."
        ],
        alignmentStatement: "At this level, support staff begin by grounding themselves in manaakitanga and whanaungatanga, recognising that stakeholder engagement is more than task-oriented, it's people-oriented. They understand that appropriate engagement with Māori requires context, sensitivity, and a willingness to listen and learn.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "This descriptor aligns with manaakitanga (hospitality, care) and whanaungatanga (relationships, connections). Understanding respectful engagement with Māori and Indigenous communities requires grounding in these foundational values, recognising that stakeholder identification is relationship-based, not transactional.",
            frameworks: ["Whāia Te Hihiri", "Te Tiriti o Waitangi"]
          },
          {
            descriptorIndex: 2,
            alignmentText: "Responding in a timely, respectful, and culturally appropriate manner reflects manaakitanga and demonstrates understanding of cultural protocols. This includes awareness of appropriate timing, communication styles, and relationship-building approaches valued in Te Ao Māori contexts.",
            frameworks: ["Whāia Te Hihiri"]
          }
        ]
      },
      {
        level: "INTERMEDIATE",
        bulletPoints: [
          "Support and contribute to culturally appropriate engagement practices by maintaining respectful communication, organising engagement activities that reflect Te Ao Māori values, and facilitating knowledge exchange that is reciprocal and inclusive.",
          "Build and maintain culturally appropriate relationships with a range of interest-holders to facilitate reciprocal knowledge exchange.",
          "Organise engagement activities such as workshops, seminars, or networking events to facilitate knowledge exchange, considering timings of cultural observances and needs for reciprocity.",
          "Recognise and communicate opportunities to connect interest-holders with relevant research expertise.",
          "Assess interest-holder feedback to identify potential improvements for engagement activities.",
          "Coordinate engagement activities across internal departments",
          "Represent the University effectively at external events and meetings."
        ],
        alignmentStatement: "This level deepens the practice of ako and kaitiakitanga. Staff can now support more dynamic engagement, ensure protocols (e.g., karakia, mihimihi) are considered, and that knowledge is not extracted but shared responsibly. The focus is on intentional practice engagement that holds space for Indigenous voices.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "This descriptor embodies ako (reciprocal learning) and kaitiakitanga (guardianship). Supporting culturally appropriate engagement requires understanding that knowledge exchange must be reciprocal and inclusive, not extractive. Activities should reflect Te Ao Māori values and create space for Indigenous voices.",
            frameworks: ["Whāia Te Hihiri", "Ngā Taumata Tutuki"]
          },
          {
            descriptorIndex: 1,
            alignmentText: "Building and maintaining culturally appropriate relationships aligns with whanaungatanga and demonstrates understanding of relationship-building as an ongoing, reciprocal process. This requires cultural competence and respect for different ways of knowing and engaging.",
            frameworks: ["Whāia Te Hihiri"]
          },
          {
            descriptorIndex: 2,
            alignmentText: "Organising engagement activities that consider timings of cultural observances and needs for reciprocity demonstrates deep respect for tikanga (cultural protocols). This includes awareness of significant dates, cultural practices, and ensuring that engagement is mana-enhancing rather than extractive.",
            frameworks: ["Whāia Te Hihiri", "Te Tiriti o Waitangi"]
          }
        ]
      },
      {
        level: "ADVANCED",
        bulletPoints: [
          "Develop and lead strategic engagement plans that embed Te Ao Māori principles, foster meaningful partnerships with Māori and Indigenous stakeholders, and support research objectives that are mutually beneficial.",
          "Develop and implement strategic engagement plans that align with the University's research priorities, values, and embed Te Ao Māori principles into practice.",
          "Proactively identify and pursue strategic partnership opportunities to advance research objectives.",
          "Negotiate and resolve complex interest-holder challenges.",
          "Identify mutual benefits, potential barriers, and opportunities in interest-holder relationships and propose options or solutions.",
          "Evaluate the effectiveness of engagement strategies and implement improvements.",
          "Manage complex multi-party relationships across different sectors or contexts.",
          "Secure buy-in and commitment from senior interest-holders for collaborative initiatives.",
          "Shape institutional policy and strategy for research engagement."
        ],
        alignmentStatement: "This level embodies rangatiratanga (leadership and self-determination). Staff are confident navigating Te Ao Māori contexts and are able to negotiate ethical and values-based relationships. Engagement is intentional, purposeful, and strategic supporting research that uplifts communities and centres Indigenous aspirations. They are also mentoring others and influencing practice.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Developing strategic engagement plans that embed Te Ao Māori principles and foster meaningful partnerships with Māori and Indigenous stakeholders demonstrates rangatiratanga (leadership) and ensures research objectives are mutually beneficial. This requires deep understanding of partnership models that honour Te Tiriti o Waitangi and centre Indigenous aspirations.",
            frameworks: ["Whāia Te Hihiri", "Te Tiriti o Waitangi", "Ngā Taumata Tutuki"]
          },
          {
            descriptorIndex: 1,
            alignmentText: "Embedding Te Ao Māori principles into strategic engagement practice requires ongoing commitment to cultural competency and relationship-building. This aligns with the University's commitment to Te Tiriti o Waitangi and ensures engagement strategies are values-based and culturally grounded.",
            frameworks: ["Te Tiriti o Waitangi", "Whāia Te Hihiri"]
          },
          {
            descriptorIndex: 8,
            alignmentText: "Shaping institutional policy and strategy for research engagement at this level requires understanding of how policy can either support or hinder meaningful engagement with Māori and Indigenous communities. Policy should be co-designed and reflect principles of partnership, protection, and participation.",
            frameworks: ["Te Tiriti o Waitangi", "Whāia Te Hihiri"]
          }
        ]
      },
      {
        level: "EXEMPLAR",
        bulletPoints: [
          "Champion transformative, sector-leading engagement practices that honour Te Tiriti o Waitangi and embed sustainable, culturally grounded models of partnership that influence institutional policy and sectoral change.",
          "Lead interest-holder engagement activities that shape the research landscape at a sectoral, national, or international level.",
          "Establish transformative research partnerships that honour Te Tiriti o Waitangi and create significant value and impact across sectors.",
          "Influence policy and decision-making in external organisations through strategic engagement.",
          "Create sustainable engagement models that become embedded in institutional practice."
        ],
        alignmentStatement: "At this level, staff are not only practitioners but kaupapa leaders, embedding tikanga-informed systems across the institution. They actively shape long-term, intergenerational relationships and foster change that is mana-enhancing, community-led, and transformative. They hold space for Indigenous innovation and co-design impactful pathways forward.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Championing transformative engagement practices that honour Te Tiriti o Waitangi requires deep commitment to partnership, protection, and participation principles. This level embodies kaupapa leadership, embedding tikanga-informed systems and creating sustainable models that influence both institutional policy and sectoral change.",
            frameworks: ["Te Tiriti o Waitangi", "Whāia Te Hihiri", "Ngā Taumata Tutuki"]
          },
          {
            descriptorIndex: 2,
            alignmentText: "Establishing transformative research partnerships that honour Te Tiriti o Waitangi requires understanding of intergenerational relationships and commitment to mana-enhancing, community-led approaches. These partnerships should create significant value while respecting Indigenous knowledge systems and self-determination.",
            frameworks: ["Te Tiriti o Waitangi", "Whāia Te Hihiri"]
          },
          {
            descriptorIndex: 4,
            alignmentText: "Creating sustainable engagement models that become embedded in institutional practice requires systems thinking and commitment to long-term, intergenerational change. These models should be co-designed with Māori and Indigenous communities and reflect principles of cultural safety and partnership.",
            frameworks: ["Whāia Te Hihiri", "Te Tiriti o Waitangi"]
          }
        ]
      }
    ]
  },
  {
    id: "maximising-impact",
    name: "Maximising Impact",
    description: "Identify opportunities for, evaluate, and enhance research impact.",
    levels: [
      {
        level: "FOUNDATION",
        bulletPoints: [
          "Understand and support diverse pathways to impact, including cultural, social, and environmental impact, by collecting data and examples that reflect the priorities of Māori and Indigenous communities.",
          "Explore and recognise foundational research impact terminology and pathways.",
          "Identify potential pathways to impact from research projects or initiatives, considering a range of impact types (e.g., economic, social, cultural, environmental).",
          "Collect relevant data, conventions/norms, or examples to support impact planning that capture community priorities and interests, particularly Māori.",
          "Support the planning and delivery of impact-focused activities.",
          "Follow established protocols for impact documentation and reporting."
        ],
        alignmentStatement: "At this level, staff begin to expand their understanding of what \"impact\" means through a kaupapa Māori lens, valuing non-economic impact types (e.g., cultural revitalisation, language transmission, whenua regeneration). They support impact reporting that acknowledges the relational, place-based, and enduring nature of Māori outcomes.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Understanding diverse pathways to impact through a kaupapa Māori lens requires valuing non-economic impact types such as cultural revitalisation, language transmission, and whenua regeneration. This aligns with Whāia Te Hihiri principles of recognising the relational, place-based, and enduring nature of Māori outcomes.",
            frameworks: ["Whāia Te Hihiri", "Te Tiriti o Waitangi"]
          },
          {
            descriptorIndex: 3,
            alignmentText: "Collecting data that captures community priorities and interests, particularly Māori, requires understanding that impact planning must be community-centred and reflect Māori aspirations. This demonstrates manaakitanga and ensures impact reporting acknowledges the relational and intergenerational nature of Māori outcomes.",
            frameworks: ["Whāia Te Hihiri"]
          }
        ]
      },
      {
        level: "INTERMEDIATE",
        bulletPoints: [
          "Advise researchers on how to embed Māori and Indigenous priorities in impact planning and support meaningful partnerships to develop equitable and reciprocal impact pathways.",
          "Create impact plans for research projects or initiatives, where appropriate.",
          "Analyse research projects or initiatives to identify and develop impact opportunities.",
          "Advise researchers on how to enhance the impact of their work, as well as embed the priorities of Māori and other groups into impact planning.",
          "Engage with current partners to build or enhance impact opportunities.",
          "Implement tracking systems for monitoring research impact.",
          "Analyse impact-related data to identify trends and opportunities for improvement."
        ],
        alignmentStatement: "Staff deepen their ability to facilitate impact in ways that are intentionally co-created with Māori communities. They understand the importance of mana-enhancing relationships, know how to integrate Māori aspirations into research design, and support impact tracking systems that reflect holistic and intergenerational change.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Advising on embedding Māori and Indigenous priorities in impact planning requires understanding of mana-enhancing relationships and reciprocal impact pathways. This reflects whanaungatanga and ensures impact is co-created with Māori communities rather than imposed upon them.",
            frameworks: ["Whāia Te Hihiri", "Te Tiriti o Waitangi"]
          },
          {
            descriptorIndex: 3,
            alignmentText: "Embedding the priorities of Māori and other groups into impact planning requires cultural competency and understanding of how to integrate Māori aspirations into research design. This ensures impact tracking systems reflect holistic and intergenerational change.",
            frameworks: ["Whāia Te Hihiri"]
          }
        ]
      },
      {
        level: "ADVANCED",
        bulletPoints: [
          "Design and lead impact strategies that honour Te Tiriti o Waitangi, centre Māori voices, and reflect Indigenous knowledge systems as legitimate and impactful. Provide strategic advice to ensure impact initiatives align with community values and long-term societal needs.",
          "Develop research impact strategies that align with University, funder, and government priorities.",
          "Design frameworks for demonstrating and evaluating research impact.",
          "Create compelling impact narratives for different audiences.",
          "Guide colleagues and researchers to understand and develop impact strategies and evaluations.",
          "Secure resourcing (e.g., funds, capability, FTE) and internal support for major impact initiatives.",
          "Evaluate complex impact data and challenges to impact development or measurement to improve future strategies.",
          "Build strategic and reciprocal partnerships specifically designed to enhance research impact."
        ],
        alignmentStatement: "This level represents a shift toward transformative practice, where staff proactively challenge narrow definitions of impact and embed kaupapa Māori research principles (such as whanaungatanga, manaakitanga and kaitiakitanga) into strategic planning. Staff here are mentors and enablers, guiding others in understanding how to elevate Māori impact pathways institutionally and externally.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Designing impact strategies that honour Te Tiriti o Waitangi and centre Māori voices requires embedding kaupapa Māori research principles (whanaungatanga, manaakitanga, kaitiakitanga) into strategic planning. This ensures Indigenous knowledge systems are recognised as legitimate and impactful, and impact initiatives align with community values and long-term societal needs.",
            frameworks: ["Te Tiriti o Waitangi", "Whāia Te Hihiri", "Ngā Taumata Tutuki"]
          }
        ]
      },
      {
        level: "EXEMPLAR",
        bulletPoints: [
          "Lead institutional transformation to redefine and embed research impact that reflects the aspirations of Māori and Indigenous communities. Influence policy, partnerships, and sector practice to create systems that prioritise equity, and long-term wellbeing.",
          "Shape University strategy to maximise research impact across the organisation.",
          "Transform how the University identifies, creates, embeds, and evaluates research impact - incorporating the aspirations of Māori and other interest holders.",
          "Shape external environment and policy to create new opportunities for research impact and prioritise the creation of equity and long-term wellbeing through research.",
          "Position the University as a leader in research impact generation and management within their context."
        ],
        alignmentStatement: "At this level, staff are change-makers, reshaping how the institution defines, measures, and supports research impact. They help to indigenise institutional policy, advocate for new evaluative frameworks, and ensure that Māori-led impact is resourced, visible, and sustained. Their work contributes to systemic change that positions the University as an exemplar of Indigenous engagement and impact.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Leading institutional transformation to reflect the aspirations of Māori and Indigenous communities requires indigenising institutional policy and advocating for new evaluative frameworks. This work centres equity and long-term wellbeing, ensuring Māori-led impact is resourced, visible, and sustained.",
            frameworks: ["Te Tiriti o Waitangi", "Whāia Te Hihiri", "Ngā Taumata Tutuki"]
          },
          {
            descriptorIndex: 2,
            alignmentText: "Transforming how the University identifies, creates, embeds, and evaluates research impact to incorporate Māori aspirations requires systemic change. This positions the University as an exemplar of Indigenous engagement and impact, ensuring Māori voices are central in impact evaluation.",
            frameworks: ["Te Tiriti o Waitangi", "Whāia Te Hihiri"]
          }
        ]
      }
    ]
  },
  {
    id: "researcher-development",
    name: "Researcher Development",
    description: "Support the development of research capabilities with effective learning and development programmes and processes.",
    levels: [
      {
        level: "FOUNDATION",
        bulletPoints: [
          "Understand the importance of identity, culture, and context in supporting Māori researcher development by leading with Manaakitanga and respectful engagement in training or learning spaces.",
          "Provide administrative support for researcher development activities.",
          "Respond to queries about researcher development and advise researchers on appropriate development opportunities based on their needs and career stage.",
          "Maintain accurate records of researcher participation in development activities.",
          "Assist in the preparation and distribution of development resources and materials.",
          "Collect feedback regarding development activities and support."
        ],
        alignmentStatement: "At this level, staff begin to understand the value of encouraging safe, inclusive spaces that reflect respect for Māori identity and diverse learning styles. They understand that Māori researcher development is not only about skill acquisition, but about connection to values, place, and people.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Understanding the importance of identity, culture, and context in supporting Māori researcher development requires leading with Manaakitanga and respectful engagement. This recognises that Māori researcher development is about connection to values, place, and people, not just skill acquisition.",
            frameworks: ["Whāia Te Hihiri"]
          }
        ]
      },
      {
        level: "INTERMEDIATE",
        bulletPoints: [
          "Embed Te Ao Māori values into development initiatives by supporting culturally responsive learning environments that enable reciprocal learning.",
          "Build relationships with academic and professional departments to support researcher development initiatives.",
          "Identify department or discipline-specific capability gaps in collaboration with faculty leadership, associate deans, or otherwise (e.g., of health researchers).",
          "Identify gaps in current development offerings and propose solutions.",
          "Design and deliver components of researcher development programmes in a culturally responsive manner.",
          "Adapt development resources to meet the diverse and unique needs of different researcher groups, embedding Te Ao Māori values where appropriate.",
          "Analyse feedback to identify improvements for future development activities.",
          "Implement monitoring systems to track researcher engagement with development opportunities."
        ],
        alignmentStatement: "Staff deepen their practice by designing and facilitating learning that reflects whanaungatanga (relationships), tikanga (protocols), and kaitiakitanga (stewardship of knowledge). Development becomes a process of co-creation where Māori knowledge systems are normalised and valued.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Embedding Te Ao Māori values into development initiatives requires supporting culturally responsive learning environments that enable reciprocal learning (ako). This reflects whanaungatanga, tikanga, and kaitiakitanga, ensuring Māori knowledge systems are normalised and valued.",
            frameworks: ["Whāia Te Hihiri", "Te Tiriti o Waitangi"]
          },
          {
            descriptorIndex: 4,
            alignmentText: "Designing and delivering researcher development programmes in a culturally responsive manner requires understanding of diverse learning styles and cultural contexts. This ensures development is inclusive and respects Māori identity and ways of knowing.",
            frameworks: ["Whāia Te Hihiri"]
          },
          {
            descriptorIndex: 5,
            alignmentText: "Adapting development resources to embed Te Ao Māori values where appropriate requires cultural competency and understanding of how to meet diverse needs. This ensures Māori knowledge systems are integrated rather than treated as add-ons.",
            frameworks: ["Whāia Te Hihiri"]
          }
        ]
      },
      {
        level: "ADVANCED",
        bulletPoints: [
          "Lead and shape Māori-centred researcher development pathways that respond to systemic gaps, promote equity, and actively support Māori researchers' aspirations.",
          "Identify emerging researcher capability trends and implement proactive development initiatives to address these.",
          "Assess researcher capability across the University, identify widespread needs, and prioritise researcher development accordingly.",
          "Create comprehensive researcher development strategies aligned with University priorities and researcher needs.",
          "Create and implement approaches to address complex development topics and needs.",
          "Adapt development systems or approaches to meet the needs of different learner groups.",
          "Secure resourcing (e.g., funds, capability, FTE) and internal support for researcher development initiatives.",
          "Evaluate the impact of development programmes and implement improvements."
        ],
        alignmentStatement: "Staff shift from inclusion to transformation. They champion kaupapa Māori development approaches, design long-term strategic initiatives, and mentor others to do the same. Their work reflects rangatiratanga (self-determination) and addresses inequity by building structures that enable Māori success.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Leading and shaping Māori-centred researcher development pathways requires championing kaupapa Māori development approaches. This reflects rangatiratanga (self-determination) and addresses systemic gaps to promote equity and actively support Māori researchers' aspirations.",
            frameworks: ["Te Tiriti o Waitangi", "Whāia Te Hihiri", "Ngā Taumata Tutuki"]
          }
        ]
      },
      {
        level: "EXEMPLAR",
        bulletPoints: [
          "Transform institutional researcher development by embedding kaupapa Māori capability frameworks that uphold Te Tiriti o Waitangi and advance intergenerational Māori research excellence.",
          "Shape institutional strategy and policy for researcher development.",
          "Establish the University as a leader in internal and external researcher development.",
          "Secure significant resourcing (e.g., funds, capability, FTE) and support to enable the institution's development capability.",
          "Embed effective culturally responsive researcher development models, strategies, and processes across the University.",
          "Lead researcher development theory or practice at a sectoral, national, or international level."
        ],
        alignmentStatement: "At this level, staff operate as kaupapa leaders. They co-design development strategies with Māori experts and communities, influence sector-wide thinking, and ensure Māori leadership is central in development. Their work holds space for innovation grounded in whakapapa, wairua, and collective uplift.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Transforming institutional researcher development by embedding kaupapa Māori capability frameworks requires upholding Te Tiriti o Waitangi and advancing intergenerational Māori research excellence. This work co-designs development strategies with Māori experts and communities, ensuring Māori leadership is central.",
            frameworks: ["Te Tiriti o Waitangi", "Whāia Te Hihiri", "Ngā Taumata Tutuki"]
          },
          {
            descriptorIndex: 4,
            alignmentText: "Embedding effective culturally responsive researcher development models across the University requires systems thinking and commitment to long-term change. These models should be co-designed with Māori communities and reflect principles of whakapapa, wairua, and collective uplift.",
            frameworks: ["Whāia Te Hihiri", "Te Tiriti o Waitangi"]
          }
        ]
      }
    ]
  },
  {
    id: "environment-culture",
    name: "Environment and Culture",
    description: "Support and advance the research environment and culture. 'Research culture' encompasses the behaviours, values, expectations, attitudes and norms of our research communities. It influences researchers' career paths and determines the way that research is conducted and communicated (The Royal Society UK).",
    levels: [
      {
        level: "FOUNDATION",
        bulletPoints: [
          "Promote inclusive research environments that acknowledge Māori perspectives and celebrate diverse contributions to knowledge.",
          "Promote research achievements through appropriate communication channels.",
          "Assist in organising research-related events and activities.",
          "Share information about research news and achievements.",
          "Demonstrate inclusive behaviours in all research support activities.",
          "Follow University protocols, values, and Te Ao Māori principles in research-related interactions.",
          "Support colleagues to adapt to changes in the research environment.",
          "Recognise and respect cultural differences between research disciplines, celebrating diverse contributions to knowledge.",
          "Identify issues that might negatively impact the University research environment."
        ],
        alignmentStatement: "Staff create space for Māori research stories and voices to be visible. They apply manaakitanga in events, communications, and day-to-day interactions that show respect for Māori research as integral to the university culture.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Promoting inclusive research environments that acknowledge Māori perspectives requires applying manaakitanga and creating space for Māori research stories and voices to be visible. This celebrates diverse contributions to knowledge and shows respect for Māori research as integral to university culture.",
            frameworks: ["Whāia Te Hihiri"]
          },
          {
            descriptorIndex: 5,
            alignmentText: "Following University protocols, values, and Te Ao Māori principles in research-related interactions demonstrates respect for Māori research and ensures cultural protocols are observed. This reflects manaakitanga in day-to-day interactions.",
            frameworks: ["Whāia Te Hihiri", "Te Tiriti o Waitangi"]
          }
        ]
      },
      {
        level: "INTERMEDIATE",
        bulletPoints: [
          "Support initiatives that foster a culturally safe and connected research culture, including events and networks that reflect Te Ao Māori values.",
          "Design and deliver research-focused events that enhance knowledge sharing, and reflect Te Ao Māori values.",
          "Implement initiatives that foster inclusion and diversity in research activities.",
          "Build networks that connect researchers across disciplinary boundaries.",
          "Facilitate dialogue between different research groups to enhance collaboration.",
          "Advise on creating supportive environments for specific research communities.",
          "Resolve common issues that affect research culture and morale.",
          "Identify opportunities to enhance the physical and digital research environment."
        ],
        alignmentStatement: "Staff embed whanaungatanga by helping build relationships across cultural boundaries. They coordinate or support environments where Māori feel seen, valued, and supported, contributing to belonging and shared learning.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Supporting initiatives that foster culturally safe and connected research culture requires embedding whanaungatanga and building relationships across cultural boundaries. Events and networks that reflect Te Ao Māori values ensure Māori feel seen, valued, and supported.",
            frameworks: ["Whāia Te Hihiri", "Te Tiriti o Waitangi"]
          },
          {
            descriptorIndex: 1,
            alignmentText: "Designing and delivering research-focused events that reflect Te Ao Māori values requires understanding of cultural protocols and ensuring knowledge sharing is reciprocal and inclusive. This contributes to belonging and shared learning.",
            frameworks: ["Whāia Te Hihiri"]
          }
        ]
      },
      {
        level: "ADVANCED",
        bulletPoints: [
          "Lead cultural change initiatives that strengthen Māori participation and ensure Māori values are embedded in the fabric of research practice.",
          "Develop strategies to enhance research culture across the institution and embed Māori values within research practice.",
          "Create initiatives that address specific cultural challenges within research communities.",
          "Lead culture change projects that involve multiple interest-holder groups.",
          "Design and implement programmes to elevate the quality of research and knowledge exchange.",
          "Build partnerships to enhance the institution's research environment."
        ],
        alignmentStatement: "Staff lead with kaitiakitanga, fostering environments that nurture Māori research potential. They address systemic issues and promote institutional practices that allow Māori values to thrive across disciplines and teams.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Leading cultural change initiatives that strengthen Māori participation requires kaitiakitanga and fostering environments that nurture Māori research potential. This ensures Māori values are embedded in the fabric of research practice.",
            frameworks: ["Te Tiriti o Waitangi", "Whāia Te Hihiri"]
          },
          {
            descriptorIndex: 1,
            alignmentText: "Developing strategies to embed Māori values within research practice requires addressing systemic issues and promoting institutional practices that allow Māori values to thrive across disciplines and teams.",
            frameworks: ["Whāia Te Hihiri"]
          }
        ]
      },
      {
        level: "EXEMPLAR",
        bulletPoints: [
          "Transform institutional culture through Māori-led approaches that centre equity, relational accountability, and collective advancement across the research landscape.",
          "Explore and embed approaches to research culture that embrace Te Ao Māori perspectives.",
          "Create transformative models for interdisciplinary research environments.",
          "Establish non-hierarchical research communities to build the culture of the University and sector.",
          "Design and embed frameworks to build understanding of research excellence from diverse research disciplines.",
          "Transform institutional approaches to researcher wellbeing and sustainable careers.",
          "Leads initiatives to reconcile competing values within the research ecosystem."
        ],
        alignmentStatement: "Staff influence the very character of the research environment. They champion wellbeing by building inclusive systems, mentoring others, and co-leading the shift toward environments that reflect a fully realised, relational, and ethical research culture grounded in Te Ao Māori.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Transforming institutional culture through Māori-led approaches requires centring equity, relational accountability, and collective advancement. This influences the very character of the research environment, ensuring it reflects a fully realised, relational, and ethical research culture grounded in Te Ao Māori.",
            frameworks: ["Te Tiriti o Waitangi", "Whāia Te Hihiri", "Ngā Taumata Tutuki"]
          },
          {
            descriptorIndex: 1,
            alignmentText: "Exploring and embedding approaches to research culture that embrace Te Ao Māori perspectives requires systems thinking and commitment to long-term change. This champions wellbeing by building inclusive systems and co-leading cultural transformation.",
            frameworks: ["Whāia Te Hihiri", "Te Tiriti o Waitangi"]
          }
        ]
      }
    ]
  },
  {
    id: "funding-opportunities",
    name: "Funding Opportunities",
    description: "Identify, build, and disseminate research funding opportunities.",
    levels: [
      {
        level: "FOUNDATION",
        bulletPoints: [
          "Understand the significance of kaupapa Māori research by identifying and sharing funding opportunities that align with Māori aspirations, values, and priorities.",
          "Identify funding opportunities from established sources.",
          "Use appropriate systems to track and monitor available funding opportunities.",
          "Assess and capture key funder priorities and requirements.",
          "Disseminate funding information to appropriate researchers in a timely manner.",
          "Maintain accurate records of funding opportunities and related communications.",
          "Respond to basic queries about funding opportunities."
        ],
        alignmentStatement: "At this level, staff begin to see funding to uplift Māori aspirations. They understand the value of funding calls that support whenua-based research, te reo Māori, mātauranga, and Indigenous knowledge systems. Their role involves careful, respectful dissemination that reflects manaakitanga and kaupapa Māori potential.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Understanding the significance of kaupapa Māori research requires identifying and sharing funding opportunities that align with Māori aspirations, values, and priorities. This reflects manaakitanga and recognises the value of funding calls that support whenua-based research, te reo Māori, mātauranga, and Indigenous knowledge systems.",
            frameworks: ["Whāia Te Hihiri", "Te Tiriti o Waitangi"]
          }
        ]
      },
      {
        level: "INTERMEDIATE",
        bulletPoints: [
          "Support Māori researchers by tailoring funding advice and relationships to reflect Te Ao Māori priorities and ensuring Māori researchers are equitably positioned in the funding landscape.",
          "Analyse funding landscapes to identify opportunities aligned with institutional research strengths and priorities.",
          "Summarise complex funding opportunities to highlight key requirements and alignment with research priorities, including priorities of Māori.",
          "Tailor funding information dissemination for different disciplines or research or cultural groups.",
          "Develop systems for matching researchers to relevant funding opportunities.",
          "Build effective working relationships with funding bodies to enhance opportunity awareness.",
          "Collaborates across departments to identify interdisciplinary funding opportunities."
        ],
        alignmentStatement: "Staff intentionally build whanaungatanga-based support structures, providing not just access but thoughtful interpretation of funder expectations. They actively seek out opportunities that align with Māori goals and advocate for inclusion of Māori-specific indicators in funding advice. Their advice uplifts mana and relational reciprocity.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Supporting Māori researchers by tailoring funding advice to reflect Te Ao Māori priorities requires building whanaungatanga-based support structures. This ensures Māori researchers are equitably positioned in the funding landscape and advocates for inclusion of Māori-specific indicators in funding advice.",
            frameworks: ["Whāia Te Hihiri", "Te Tiriti o Waitangi"]
          },
          {
            descriptorIndex: 2,
            alignmentText: "Summarising funding opportunities to highlight alignment with research priorities, including priorities of Māori, requires thoughtful interpretation of funder expectations. This uplifts mana and ensures relational reciprocity in funding advice.",
            frameworks: ["Whāia Te Hihiri"]
          }
        ]
      },
      {
        level: "ADVANCED",
        bulletPoints: [
          "Design and lead funding strategies that prioritise Māori-led research and build partnerships with funders to support kaupapa Māori outcomes and long-term equity.",
          "Develop horizon-scanning approaches to identify emerging funding trends and opportunities.",
          "Build relationships with funders to shape opportunities that align with institutional priorities.",
          "Create strategies to maximise success with competitive or limited-submission opportunities.",
          "Manage or acquire internal funding to maximise external success.",
          "Develop approaches for leveraging non-traditional or diverse funding sources.",
          "Influence internal policies and funding to enhance University readiness for major funding opportunities.",
          "Build internal capability to respond to emerging funding opportunities and trends.",
          "Develop University funding intelligence capabilities to provide strategic advantage.",
          "Evaluate the effectiveness of funding opportunity identification and dissemination processes."
        ],
        alignmentStatement: "At this level, staff co-create funding ecosystems that support Māori research sovereignty. They embed kaitiakitanga by ensuring Māori knowledge is protected and valued in agreements and use their position to influence funders toward equity-based approaches. Their work centres Māori leadership and aspirations.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Designing funding strategies that prioritise Māori-led research requires co-creating funding ecosystems that support Māori research sovereignty. This embeds kaitiakitanga by ensuring Māori knowledge is protected and valued, and centres Māori leadership and aspirations.",
            frameworks: ["Te Tiriti o Waitangi", "Whāia Te Hihiri", "Ngā Taumata Tutuki"]
          }
        ]
      },
      {
        level: "EXEMPLAR",
        bulletPoints: [
          "Transform funding policy and practice by co-developing Indigenous-led funding models that embed equity, tino rangatiratanga, and sustainable impact for Māori research.",
          "Establish the University as a trusted partner with major funding bodies through strategic relationship management.",
          "Support or advocate for indigenous-led research funding models that embed equity, tino rangatiratanga, and support kaupapa Māori outcomes.",
          "Create new funding streams or opportunities by utilising and securing internal or philanthropic funds.",
          "Influence external funding policies through participation in advisory groups and consultation processes.",
          "Position researchers and University teams advantageously for emerging funding priorities before formal announcements."
        ],
        alignmentStatement: "Staff here are change-makers who challenge existing systems and advocate for transformative investment in Māori research. Their work centres intergenerational impact, creating funding mechanisms that are Māori-led, value Māori innovation, and restore balance through Te Tiriti o Waitangi. They are architects of systemic equity.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Transforming funding policy by co-developing Indigenous-led funding models requires embedding equity, tino rangatiratanga, and sustainable impact for Māori research. This challenges existing systems and advocates for transformative investment, creating funding mechanisms that are Māori-led and restore balance through Te Tiriti o Waitangi.",
            frameworks: ["Te Tiriti o Waitangi", "Whāia Te Hihiri", "Ngā Taumata Tutuki"]
          },
          {
            descriptorIndex: 2,
            alignmentText: "Supporting or advocating for indigenous-led research funding models requires embedding equity, tino rangatiratanga, and supporting kaupapa Māori outcomes. This centres intergenerational impact and values Māori innovation.",
            frameworks: ["Te Tiriti o Waitangi", "Whāia Te Hihiri"]
          }
        ]
      }
    ]
  },
  {
    id: "proposal-support",
    name: "Proposal Support",
    description: "Support and develop research proposals.",
    levels: [
      {
        level: "FOUNDATION",
        bulletPoints: [
          "Understand and respect the relevance of Māori knowledge and values in research proposals by supporting culturally considerate administrative. practices and ethics awareness.",
          "Assist in gathering and organising information required for research proposals.",
          "Encourage researchers to engage early with ethics processes to ensure alignment with accreditation requirements (e.g., Health Research Council NZ).",
          "Respond to basic queries about the University's proposal and ethics requirements and processes.",
          "Provide administrative support to proposal and ethics submission processes.",
          "Check proposals against funder guidelines for basic compliance and formatting.",
          "Develop accurate project budgets that comply with both funder and institutional guidelines.",
          "Identify and flag potential issues with proposal completeness or deadline compliance.",
          "Maintain accurate records of proposal submissions and outcomes."
        ],
        alignmentStatement: "At this level, staff begin to understand that supporting proposals involving Māori requires more than technical skill. They demonstrate manaakitanga by ensuring Māori components are not treated as add-ons, but as valued and integral. They take care with language, protocols, and basic ethics steps that honour Māori involvement.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Understanding and respecting the relevance of Māori knowledge and values in research proposals requires supporting culturally considerate administrative practices and ethics awareness. This demonstrates manaakitanga by ensuring Māori components are valued and integral, not treated as add-ons.",
            frameworks: ["Whāia Te Hihiri"]
          }
        ]
      },
      {
        level: "INTERMEDIATE",
        bulletPoints: [
          "Support researchers to incorporate Māori perspectives into proposal design by providing advice on appropriate engagement, ethics, and alignment with Māori priorities.",
          "Review proposal content and provide feedback on alignment with funder requirements and the incorporation of Māori perspectives as appropriate.",
          "Contribute to proposal writing as appropriate, including review and editing.",
          "Coordinate inputs from multiple contributors to ensure cohesive and complete submissions.",
          "Interpret funder guidelines and translate these into practical guidance for researchers.",
          "Identify potential ethical considerations and provide clear feedback for researchers."
        ],
        alignmentStatement: "Staff grow in confidence supporting kaupapa Māori elements in proposals. They support whanaungatanga by encouraging early engagement with Māori communities and ensuring proposals consider reciprocity, co-ownership, and culturally relevant impact. They help create proposals that reflect tikanga-aligned intent, even when not leading the process.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Supporting researchers to incorporate Māori perspectives into proposal design requires providing advice on appropriate engagement, ethics, and alignment with Māori priorities. This supports whanaungatanga by encouraging early engagement with Māori communities and ensuring proposals consider reciprocity and co-ownership.",
            frameworks: ["Whāia Te Hihiri", "Te Tiriti o Waitangi"]
          },
          {
            descriptorIndex: 1,
            alignmentText: "Reviewing proposal content to provide feedback on incorporation of Māori perspectives requires understanding of tikanga-aligned intent. This helps create proposals that reflect culturally relevant impact and ensure Māori contributions are visible and valued.",
            frameworks: ["Whāia Te Hihiri"]
          }
        ]
      },
      {
        level: "ADVANCED",
        bulletPoints: [
          "Lead the development of proposals that embed Te Tiriti o Waitangi, support Māori-led research, and align with kaupapa Māori methodologies and ethics frameworks.",
          "Lead the support for large-scale or complex proposals and resolve emerging issues.",
          "Support Māori-led research proposals and assist others to embed Te Tiriti o Waitangi and kaupapa Māori methodologies into their proposals.",
          "Create proposal support strategies tailored to high-value, complex, or strategic funding schemes.",
          "Analyse proposal success rates and implement targeted improvement strategies.",
          "Evaluate the effectiveness of proposal support activities for different research groups, including Māori, and implement improvements.",
          "Design institutional resources that enhance proposal quality and competitiveness."
        ],
        alignmentStatement: "Staff demonstrate a deep understanding of kaupapa Māori approaches and guide others in weaving these into robust, values-based proposals. They help researchers articulate Māori outcomes and ensure ethical practices reflect kaitiakitanga, manaakitanga, and tino rangatiratanga. Their work ensures Māori contributions are visible and valued.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Leading the development of proposals that embed Te Tiriti o Waitangi requires deep understanding of kaupapa Māori approaches and guiding others in weaving these into robust, values-based proposals. This ensures ethical practices reflect kaitiakitanga, manaakitanga, and tino rangatiratanga.",
            frameworks: ["Te Tiriti o Waitangi", "Whāia Te Hihiri", "Ngā Taumata Tutuki"]
          },
          {
            descriptorIndex: 2,
            alignmentText: "Supporting Māori-led research proposals and assisting others to embed Te Tiriti o Waitangi and kaupapa Māori methodologies requires ensuring Māori contributions are visible and valued. This helps researchers articulate Māori outcomes and align with kaupapa Māori ethics frameworks.",
            frameworks: ["Te Tiriti o Waitangi", "Whāia Te Hihiri"]
          }
        ]
      },
      {
        level: "EXEMPLAR",
        bulletPoints: [
          "Shape institutional proposal development practices by embedding kaupapa Māori standards and mentoring others to apply Te Ao Māori values confidently and respectfully.",
          "Contribute to the development of, or develop, complex research proposals.",
          "Embed kaupapa Māori standards and practices into proposal development processes.",
          "Establish and build competitive advantages for University proposal development.",
          "Develop strategic relationships with funders to provide early insight into evaluation priorities and influence funders.",
          "Negotiate with major funders to align funding priorities with University strengths and community needs."
        ],
        alignmentStatement: "Staff at this level enable systemic change. They influence proposal norms by making Māori inclusion not just possible but expected, with support. They support safe learning environments for colleagues to grow in this space. Through leadership grounded in humility, ako, and collaboration, they build capability across the institution to uphold Te Tiriti commitments meaningfully.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Shaping institutional proposal development practices by embedding kaupapa Māori standards requires mentoring others to apply Te Ao Māori values confidently and respectfully. This enables systemic change and builds capability across the institution to uphold Te Tiriti commitments meaningfully.",
            frameworks: ["Te Tiriti o Waitangi", "Whāia Te Hihiri", "Ngā Taumata Tutuki"]
          },
          {
            descriptorIndex: 2,
            alignmentText: "Embedding kaupapa Māori standards and practices into proposal development processes requires leadership grounded in humility, ako, and collaboration. This influences proposal norms by making Māori inclusion not just possible but expected, with support.",
            frameworks: ["Whāia Te Hihiri", "Te Tiriti o Waitangi"]
          }
        ]
      }
    ]
  },
  {
    id: "initiation",
    name: "Initiation",
    description: "Negotiate, agree, and set up research projects or initiatives.",
    levels: [
      {
        level: "FOUNDATION",
        bulletPoints: [
          "Understand the importance of culturally appropriate project initiation processes, including basic understanding of Māori Data Sovereignty, knowledge rights, and respectful engagement protocols.",
          "Initiate documentation required to set up approved research projects and establish files and records in relevant databases.",
          "Process contracts and simple funder agreements, such as travel grants, within University systems.",
          "Coordinate project inception processes across interest-holder groups or departments.",
          "Follow established protocols for project setup with consideration to contractual and compliance requirements.",
          "Communicate basic project requirements to relevant interest-holders.",
          "Identify potential project setup issues and escalate appropriately."
        ],
        alignmentStatement: "At this level, staff begin to consider how project setup can reflect manaakitanga and tikanga Māori. They support researchers in ensuring agreements and documentation are clear, inclusive, and reflect the presence of Māori knowledge or collaborators. Their role is grounded in care, integrity, and awareness of cultural context.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Understanding culturally appropriate project initiation processes requires basic understanding of Māori Data Sovereignty, knowledge rights, and respectful engagement protocols. This reflects manaakitanga and tikanga Māori, ensuring agreements are clear, inclusive, and reflect the presence of Māori knowledge or collaborators.",
            frameworks: ["Whāia Te Hihiri", "Te Tiriti o Waitangi"]
          }
        ]
      },
      {
        level: "INTERMEDIATE",
        bulletPoints: [
          "Support project initiation in ways that uphold ethical relationships with Māori communities, ensuring that contracting and setup processes honour shared values and commitments.",
          "Negotiate and execute standard agreement terms with external partners or funders.",
          "Advise researchers on standard project setup requirements, processes, and conformance with funder requirements.",
          "Confirm that ethics approval, or alternative approval/s if appropriate, have been given before project commencement.",
          "Develop comprehensive setup plans that address compliance requirements.",
          "Anticipate and mitigate against potential setup delays through proactive engagement activities.",
          "Implement appropriate risk assessment, mitigation, and management processes during project or initiative setup.",
          "Resolve standard issues in project or initiative setup and contracting."
        ],
        alignmentStatement: "Staff applies values aligned processes in their approach to project set up. They recognise and anticipate project issues such as Māori data sovereignty, intellectual property, and engagement protocols, working with existing frameworks to ensure Māori contributions are acknowledged and protected.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Supporting project initiation in ways that uphold ethical relationships with Māori communities requires ensuring contracting and setup processes honour shared values and commitments. This recognises and anticipates issues such as Māori data sovereignty, intellectual property, and engagement protocols.",
            frameworks: ["Whāia Te Hihiri", "Te Tiriti o Waitangi"]
          }
        ]
      },
      {
        level: "ADVANCED",
        bulletPoints: [
          "Lead culturally responsive initiation processes that embed Te Ao Māori values, reflecting Māori Data Sovereignty and Mātauranga Māori, that enables the right of Māori to be equal co-design partners.",
          "Draft, negotiate, and execute complex agreement terms that balance interest-holder perspectives with University requirements.",
          "Advise researchers, kaimahi, or partners on specialised agreement areas such as clinical trials, Māori data sovereignty, intellectual property, or otherwise.",
          "Develop and implement streamlined approaches to project initiation standards and enhance project or initiative setup.",
          "Support the setup of large-scale or strategically important research initiatives.",
          "Develop solutions to complex project challenges, or large-scale or strategically important research initiatives.",
          "Respond to changes in funder requirements collaboratively and in partnership with other Universities or entities."
        ],
        alignmentStatement: "Staff design and lead initiation pathways that reflects rangatiratanga (Māori authority) and partnership. They work closely with researchers to ensure contracts and processes are respectful, equitable and transparent, especially where Māori knowledge or communities are involved. They actively mentor and guide others, promoting consistent and culturally responsive practice.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Leading culturally responsive initiation processes that embed Te Ao Māori values requires reflecting Māori Data Sovereignty and Mātauranga Māori, enabling the right of Māori to be equal co-design partners. This reflects rangatiratanga (Māori authority) and partnership, ensuring contracts and processes are respectful, equitable and transparent.",
            frameworks: ["Te Tiriti o Waitangi", "Whāia Te Hihiri", "Ngā Taumata Tutuki"]
          },
          {
            descriptorIndex: 2,
            alignmentText: "Advising on specialised agreement areas such as Māori data sovereignty requires understanding of how to protect and acknowledge Māori contributions. This ensures Māori knowledge or communities are involved in ways that are respectful, equitable and transparent.",
            frameworks: ["Te Tiriti o Waitangi", "Whāia Te Hihiri"]
          }
        ]
      },
      {
        level: "EXEMPLAR",
        bulletPoints: [
          "Shape institution-wide research initiation practices by embedding kaupapa Māori principles in setup, contracting, and partnership models across disciplines and teams.",
          "Draft contracts or contract templates for large-scale, multi-party, or strategically important research initiatives.",
          "Support or embed kaupapa Māori principles into initiation processes within their context or across teams.",
          "Shape University policies for research contracts and agreements based on international best practice.",
          "Establish partnership frameworks with major research collaborators.",
          "Position the University advantageously in complex research collaborations."
        ],
        alignmentStatement: "Staff shape and lead institution wide research initiation practices that integrate Te Tiriti and Te Ao Māori principles at scale. They develop systems, tools, and templates that make culturally aligned initiation practical and achievable across disciplines and teams, empowering all staff to act with confidence and cultural integrity.",
        descriptorAlignments: [
          {
            descriptorIndex: 1,
            alignmentText: "Supporting or embedding kaupapa Māori principles into initiation processes requires developing systems, tools, and templates that make culturally aligned initiation practical and achievable. This shapes institution-wide practices that integrate Te Tiriti and Te Ao Māori principles at scale.",
            frameworks: ["Te Tiriti o Waitangi", "Whāia Te Hihiri"]
          }
        ]
      }
    ]
  },
  {
    id: "projects-initiatives",
    name: "Projects and Initiatives",
    description: "Manage research projects and initiatives.",
    levels: [
      {
        level: "FOUNDATION",
        bulletPoints: [
          "Demonstrate Manaakitanga and whanaungatanga when supporting Māori related projects recognising the historical context of Aotearoa and the responsibilities it brings to research partnerships.",
          "Maintain accurate project documentation and financial records.",
          "Process research-related financial transactions following established procedures.",
          "Monitor basic project milestones and deliverables against planned timelines, identifying and escalating risks.",
          "Assist with routine project administration, meeting organisation, and queries from interest-holders.",
          "Update project information in institutional systems and databases."
        ],
        alignmentStatement: "At this level, staff understand that Māori-led or Māori-involved projects carry cultural responsibilities. They apply manaakitanga through respectful communication and attention to detail, ensuring that relational and cultural elements are not overlooked in operational delivery.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Demonstrating Manaakitanga and whanaungatanga when supporting Māori-related projects requires recognising the historical context of Aotearoa and the responsibilities it brings to research partnerships. This applies manaakitanga through respectful communication, ensuring relational and cultural elements are not overlooked.",
            frameworks: ["Whāia Te Hihiri"]
          }
        ]
      },
      {
        level: "INTERMEDIATE",
        bulletPoints: [
          "Coordinate project activities in ways that uphold Māori engagement, reflect tikanga, and supports relationship continuity across the research lifecycle.",
          "Manage day-to-day operations of research projects, resolving operational issues.",
          "Prepare and monitor project budgets, tracking expenditure against forecasts.",
          "Coordinate project activities involving multiple team members and workstreams.",
          "Maintain an authentic and reciprocal relationship with Māori and other interest-holders centering shared aspirations.",
          "Ensure standard projects comply with funder and institutional requirements.",
          "Produce accurate project reports for internal and external interest-holders."
        ],
        alignmentStatement: "Staff embed whanaungatanga and kaitiakitanga into project workflows. They are responsive to Māori partners' timeframes, values, and communication styles, and they ensure project deliverables consider Māori benefit and shared responsibility. They keep relational integrity front of mind alongside timelines and outputs.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Coordinating project activities in ways that uphold Māori engagement and reflect tikanga requires embedding whanaungatanga and kaitiakitanga into project workflows. This supports relationship continuity across the research lifecycle and ensures project deliverables consider Māori benefit and shared responsibility.",
            frameworks: ["Whāia Te Hihiri", "Te Tiriti o Waitangi"]
          },
          {
            descriptorIndex: 4,
            alignmentText: "Maintaining an authentic and reciprocal relationship with Māori and other interest-holders requires centring shared aspirations and being responsive to Māori partners' timeframes, values, and communication styles. This keeps relational integrity front of mind alongside timelines and outputs.",
            frameworks: ["Whāia Te Hihiri"]
          }
        ]
      },
      {
        level: "ADVANCED",
        bulletPoints: [
          "Manage complex projects involving Māori partners by embedding kaupapa Māori practices and ensuring relational, ethical, and community-focused outcomes are achieved.",
          "Manage complex research projects or initiatives involving multiple workstreams or partners.",
          "Develop financial strategies that maximise research outputs within budget constraints.",
          "Develop and implement performance frameworks that enhance research project or initiative outcomes.",
          "Create solutions to complex project management and financial challenges.",
          "Evaluate project or initiative outcomes against strategic objectives."
        ],
        alignmentStatement: "Staff lead with purpose and intention, ensuring projects involving Māori move beyond transactional work to mana-enhancing collaboration. They guide research teams in managing expectations, honouring commitments, and translating outcomes into value for Māori communities.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Managing complex projects involving Māori partners requires embedding kaupapa Māori practices and ensuring relational, ethical, and community-focused outcomes. This leads with purpose and intention, moving beyond transactional work to mana-enhancing collaboration that translates outcomes into value for Māori communities.",
            frameworks: ["Te Tiriti o Waitangi", "Whāia Te Hihiri", "Ngā Taumata Tutuki"]
          }
        ]
      },
      {
        level: "EXEMPLAR",
        bulletPoints: [
          "Transform project management systems to reflect kaupapa Māori approaches and lead institutional practices that normalise Māori-led and culturally grounded research delivery.",
          "Coordinate major research-related programmes that span University and sectoral boundaries.",
          "Embed or facilitate kaupapa Māori approaches for research and project management within University systems.",
          "Create governance frameworks for projects or initiatives that balance innovation with accountability.",
          "Enhance the University's reputation as a centre of excellence for managing specific types of research.",
          "Design approaches to translate project outcomes into sustainable action."
        ],
        alignmentStatement: "Staff are leaders of transformation, embedding tea o Māori values into how projects are scoped, resourced, and delivered. They mentor others, influence institutional systems, and make Māori-centred project management accessible and achievable across disciplines.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Transforming project management systems to reflect kaupapa Māori approaches requires leading institutional practices that normalise Māori-led and culturally grounded research delivery. This embeds Te Ao Māori values into how projects are scoped, resourced, and delivered.",
            frameworks: ["Te Tiriti o Waitangi", "Whāia Te Hihiri", "Ngā Taumata Tutuki"]
          },
          {
            descriptorIndex: 2,
            alignmentText: "Embedding or facilitating kaupapa Māori approaches for research and project management within University systems requires systems thinking and commitment to transformation. This makes Māori-centred project management accessible and achievable across disciplines.",
            frameworks: ["Whāia Te Hihiri", "Te Tiriti o Waitangi"]
          }
        ]
      }
    ]
  },
  {
    id: "monitoring-reporting",
    name: "Monitoring and Reporting",
    description: "Monitor and report on activities to fulfil statutory and compliance requirements.",
    levels: [
      {
        level: "FOUNDATION",
        bulletPoints: [
          "Understanding the importance of Māori Data Sovereignty when including Māori in data collection and reporting.",
          "Collect and record data on research activities using established templates and systems, maintaining confidentiality and data protection standards.",
          "Compile basic reports on research activities and outputs.",
          "Check data for accuracy and completeness before submission.",
          "Follow established monitoring and reporting schedules.",
          "Identify and adhere to key compliance frameworks relevant to research."
        ],
        alignmentStatement: "Staff begin to appreciate that Māori impact can be qualitative, relational, and long-term. They practise manaakitanga by treating data about Māori research or communities with sensitivity, ensuring information is shared and stored appropriately and context is respected.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Understanding the importance of Māori Data Sovereignty when including Māori in data collection and reporting requires appreciating that Māori impact can be qualitative, relational, and long-term. This practises manaakitanga by treating data about Māori research or communities with sensitivity, ensuring information is shared and stored appropriately.",
            frameworks: ["Whāia Te Hihiri", "Te Tiriti o Waitangi"]
          }
        ]
      },
      {
        level: "INTERMEDIATE",
        bulletPoints: [
          "Support culturally appropriate reporting practices such as methods of data use and knowledge sharing that reflect Te Ao Māori values and Māori aspirations.",
          "Interpret complex reporting guidelines and use these to inform practical monitoring approaches.",
          "Implement non-extractive methods of data collection which ensure mutual benefit and accurate reflections of groups' interests.",
          "Analyse programme data to identify trends and inform strategic discussions.",
          "Produce comprehensive reports tailored to different interest-holder needs and requirements.",
          "Identify potential compliance risks and develop mitigation strategies.",
          "Implement processes to ensure compliance with relevant regulatory requirements.",
          "Advise researchers, RMA professionals, and others on meeting statutory and funder compliance requirements."
        ],
        alignmentStatement: "Staff integrate kaitiakitanga (stewardship) by protecting Māori data and reflecting its intent and origin in reporting. They understand that monitoring isn't just about compliance but about showing accountability to Māori communities and partners in ways that uphold relationships and values.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Supporting culturally appropriate reporting practices that reflect Te Ao Māori values and Māori aspirations requires integrating kaitiakitanga (stewardship) by protecting Māori data and reflecting its intent and origin. This shows accountability to Māori communities and partners in ways that uphold relationships and values.",
            frameworks: ["Whāia Te Hihiri", "Te Tiriti o Waitangi"]
          },
          {
            descriptorIndex: 2,
            alignmentText: "Implementing non-extractive methods of data collection requires ensuring mutual benefit and accurate reflections of groups' interests. This understands that monitoring isn't just about compliance but about showing accountability to Māori communities.",
            frameworks: ["Whāia Te Hihiri"]
          }
        ]
      },
      {
        level: "ADVANCED",
        bulletPoints: [
          "Design and lead culturally responsive monitoring tools and systems that embed Māori data and outputs, and enable reporting that reflects Māori definitions of success.",
          "Develop monitoring tools or approaches to capture diverse research activities, maintain standards while reducing burden.",
          "Design institution-wide reporting systems that enhance transparency and accountability.",
          "Lead responses to significant regulatory changes or compliance challenges and risks.",
          "Implement systems that translate monitoring data into actionable insights.",
          "Evaluate the effectiveness of monitoring and reporting mechanisms.",
          "Drive and embed compliance culture within research communities."
        ],
        alignmentStatement: "Staff lead innovation by including Māori relevant into tracking tools. They work with Māori partners to co-develop reporting processes that acknowledge mana motuhake and relational accountability, not just funder requirements.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Designing and leading culturally responsive monitoring tools that embed Māori data and outputs requires working with Māori partners to co-develop reporting processes. This enables reporting that reflects Māori definitions of success and acknowledges mana motuhake and relational accountability.",
            frameworks: ["Te Tiriti o Waitangi", "Whāia Te Hihiri", "Ngā Taumata Tutuki"]
          }
        ]
      },
      {
        level: "EXEMPLAR",
        bulletPoints: [
          "Influence institutional and sectoral change by embedding Māori-led evaluation and reporting frameworks across the research ecosystem.",
          "Influence relevant regulatory frameworks through engagement with policy makers.",
          "Develop or utilise compliance models that drive the University to consistent improvement.",
          "Feed into the design of institutional intelligence systems to transform reporting data into usable information.",
          "Establish and utilise governance structures that effectively balance compliance with research innovation.",
          "Design monitoring approaches that capture previously unevidenced research impacts.",
          "Establish or utilise ethical frameworks that drive standards in research transparency.",
          "Collaborate across the sector to align reporting requirements to/for funding bodies."
        ],
        alignmentStatement: "Staff here help redefine how impact is measured, centring kaupapa Māori thinking in compliance systems. They advocate for frameworks that reflect Māori perspectives and mentor others in shifting from extractive to relational monitoring practices that are sustainable.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Influencing institutional and sectoral change by embedding Māori-led evaluation and reporting frameworks requires redefining how impact is measured and centring kaupapa Māori thinking in compliance systems. This advocates for frameworks that reflect Māori perspectives and shifts from extractive to relational monitoring practices.",
            frameworks: ["Te Tiriti o Waitangi", "Whāia Te Hihiri", "Ngā Taumata Tutuki"]
          }
        ]
      }
    ]
  },
  {
    id: "policy-strategy",
    name: "Policy and Strategy",
    description: "Contribute to, develop, implement, and uphold research-related policies and strategies.",
    levels: [
      {
        level: "FOUNDATION",
        bulletPoints: [
          "Understand the relevance of Te Tiriti o Waitangi and Māori research priorities when contributing to or implementing research-related policy.",
          "Collect information and data to inform research policy and strategy development.",
          "Assist in implementing established research policies and procedures.",
          "Respond to queries about existing research policies and strategies.",
          "Maintain awareness of research-related policies and their relevance to personal contexts.",
          "Provide meaningful input to University working groups, feeding into the process and feeding back updates to teams."
        ],
        alignmentStatement: "Staff begin by learning what Te Tiriti means in their role and how it shapes institutional direction. They participate with humility, apply manaakitanga when gathering and sharing policy information, and acknowledge Māori needs in policy conversations.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Understanding the relevance of Te Tiriti o Waitangi and Māori research priorities requires learning what Te Tiriti means in one's role and how it shapes institutional direction. This participates with humility, applies manaakitanga when gathering and sharing policy information, and acknowledges Māori needs in policy conversations.",
            frameworks: ["Te Tiriti o Waitangi", "Whāia Te Hihiri"]
          }
        ]
      },
      {
        level: "INTERMEDIATE",
        bulletPoints: [
          "Support the development of research policy and strategy that reflects Māori aspirations and Te Ao Māori values, ensuring consultation is inclusive and genuine.",
          "Analyse research data and trends to provide evidence for policy development.",
          "Draft sections of research policies and strategy documents.",
          "Inclusively consult with interest-holders to gather inputs for policy development.",
          "Identify potential policy issues or gaps and escalate appropriately.",
          "Effectively communicate policy changes to interest-holders and support their implementation.",
          "Advise researchers, RMA professionals, and others on how policy and strategy implications affect their work.",
          "Identify connections between different research policies and strategies."
        ],
        alignmentStatement: "Staff demonstrate whanaungatanga and pono by enabling Māori voices to be heard in policy spaces. They work collaboratively and understand the importance of authentic engagement, not just for compliance, but for transformation.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Supporting the development of research policy and strategy that reflects Māori aspirations and Te Ao Māori values requires demonstrating whanaungatanga and pono by enabling Māori voices to be heard. This ensures consultation is inclusive and genuine, not just for compliance, but for transformation.",
            frameworks: ["Whāia Te Hihiri", "Te Tiriti o Waitangi"]
          }
        ]
      },
      {
        level: "ADVANCED",
        bulletPoints: [
          "Lead the integration of kaupapa Māori principles into institutional research policy and strategy by embedding Māori priorities and ethical responsibilities into core planning documents.",
          "Develop comprehensive research policies that address complex institutional challenges, Māori priorities, and ethical responsibilities.",
          "Create strategic frameworks to enable research excellence across the University, or within faculties, schools, teams, institutes, or centres.",
          "Align research policies with broader internal goals and external environments.",
          "Lead consultation processes that incorporate diverse interest-holder perspectives.",
          "Translate external policy developments into effective institutional responses.",
          "Design implementation plans for major policy initiatives and lead their communication.",
          "Evaluate the impact of policy and strategy changes and recommend evidence-based improvements."
        ],
        alignmentStatement: "Staff uphold rangatiratanga by guiding strategy development that centres Māori-led research, mātauranga, and equitable partnerships. They ensure policy frameworks are reflective of Māori knowledge systems and are co-owned by those they affect.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Leading the integration of kaupapa Māori principles into institutional research policy and strategy requires upholding rangatiratanga by guiding strategy development that centres Māori-led research, mātauranga, and equitable partnerships. This embeds Māori priorities and ethical responsibilities into core planning documents.",
            frameworks: ["Te Tiriti o Waitangi", "Whāia Te Hihiri", "Ngā Taumata Tutuki"]
          },
          {
            descriptorIndex: 1,
            alignmentText: "Developing comprehensive research policies that address Māori priorities and ethical responsibilities requires ensuring policy frameworks are reflective of Māori knowledge systems and are co-owned by those they affect.",
            frameworks: ["Te Tiriti o Waitangi", "Whāia Te Hihiri"]
          }
        ]
      },
      {
        level: "EXEMPLAR",
        bulletPoints: [
          "Transform research policy environments through strategic leadership that embeds Māori-led thinking and equity-based policy development across the institution and beyond.",
          "Anticipate shifts in the research landscape and develop pre-emptive policy responses.",
          "Lead the integration of kaupapa Māori principles into University research policy and strategy.",
          "Craft research strategies that position the institution at the forefront of emerging fields.",
          "Integrate research policy with University and relevant external frameworks.",
          "Influence national research policy through evidence-based advocacy and sector leadership."
        ],
        alignmentStatement: "At this level, staff influence not only internal frameworks but also national research strategy to reflect Te Tiriti and kaupapa Māori practice. They bring Indigenous innovation to the fore and build policy cultures grounded in inclusion, care, and long-term collective wellbeing.",
        descriptorAlignments: [
          {
            descriptorIndex: 0,
            alignmentText: "Transforming research policy environments through strategic leadership that embeds Māori-led thinking requires influencing not only internal frameworks but also national research strategy to reflect Te Tiriti and kaupapa Māori practice. This builds policy cultures grounded in inclusion, care, and long-term collective wellbeing.",
            frameworks: ["Te Tiriti o Waitangi", "Whāia Te Hihiri", "Ngā Taumata Tutuki"]
          },
          {
            descriptorIndex: 2,
            alignmentText: "Leading the integration of kaupapa Māori principles into University research policy and strategy requires bringing Indigenous innovation to the fore and ensuring policy development is equity-based across the institution and beyond.",
            frameworks: ["Te Tiriti o Waitangi", "Whāia Te Hihiri"]
          }
        ]
      }
    ]
  }
];

