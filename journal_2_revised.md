# RMA Capability Framework Self-Assessment Tool
## Project Journal - Phase 2

**Author:** [Your Name]  
**Date:** January 2026  
**Supervisor:** [Supervisor Name]  
**Institution:** University of Auckland

---

## 1. Executive Summary

This journal documents the development of an interactive web application designed to facilitate self-assessment of Research Management and Administration (RMA) professionals at the University of Auckland. The tool translates the RMA Capability Framework (Version 1.5) into an accessible digital platform, enabling staff to evaluate their competencies across ten key capability areas and plan professional development pathways. The application leverages modern web technologies to deliver an intuitive user experience aligned with contemporary UX principles and accessibility standards.

---

## 2. Project Background and Context

### 2.1 The RMA Profession and Capability Development

Research Management and Administration has emerged as a distinct professional discipline supporting research excellence in higher education institutions globally (Kerridge & Scott, 2018). As research funding landscapes become increasingly complex and compliance requirements expand, universities require sophisticated support systems staffed by professionals with diverse competencies (Langley & Ofosu, 2007). The University of Auckland recognizes this evolution through its commitment to developing structured capability frameworks that define professional expectations while honoring Te Tiriti o Waitangi principles.

### 2.2 Digital Tools for Professional Development

Traditional paper-based competency assessments present limitations in accessibility, data persistence, and user engagement (Kirkwood & Price, 2014). Contemporary professional development increasingly relies on digital self-assessment tools that offer immediate feedback, progress tracking, and personalized recommendations (Janssen et al., 2013). Research indicates that interactive digital platforms enhance user engagement through reduced cognitive load and progressive disclosure of information (Sweller et al., 2011).

### 2.3 The UoA RMA Capability Framework

Developed through collaborative consultation with 16 RMA professionals led by Julia Mouatt, Victoria Louise Smith, and Louise Brand, the framework identifies ten core capabilities spanning five key functions: Research Engagement and Impact, Researcher Development and Culture, Research Proposal Development, Research Project and Risk Management, and Research Policy and Strategy. Each capability articulates four progressive levels (Foundation, Intermediate, Advanced, Exemplar) with behavioral indicators and Māori alignment statements that embed Te Ao Māori values and cultural responsiveness into professional practice.

---

## 3. Literature Review

### 3.1 Competency Frameworks in Research Management

Competency frameworks serve as foundational tools for defining professional standards, guiding recruitment, and structuring career progression (Galea et al., 2015). The ARMA (Association of Research Managers and Administrators) Competency Framework established international benchmarks for research management professionals across seven domains (Galea et al., 2015). Similarly, Vitae's Researcher Development Framework provides structured pathways for researcher support professionals (Vitae, 2011). These frameworks demonstrate the value of clearly articulated progression levels that enable self-assessment and targeted development planning.

### 3.2 Self-Assessment in Professional Development

Self-assessment plays a critical role in reflective practice and professional growth. Research by Eva and Regehr (2005) highlights that structured self-assessment tools, when combined with external benchmarks, support more accurate self-evaluation than unguided reflection. Boud and Falchikov (2006) emphasize that effective self-assessment requires clear criteria, opportunities for practice, and integration with development planning. The RMA tool addresses these requirements through explicit level descriptors, interactive selection mechanisms, and immediate feedback on development pathways.

### 3.3 Web Technologies for Interactive Applications

Modern web applications leverage component-based architectures that enhance maintainability and scalability. React, a JavaScript library developed by Meta, provides a declarative approach to building user interfaces through reusable components (Facebook Inc., 2023). Next.js extends React with server-side rendering capabilities, optimized routing, and improved performance metrics (Vercel, 2023). Research by Nielsen Norman Group (2020) demonstrates that single-page applications with client-side routing reduce page load times and improve perceived performance, directly impacting user satisfaction.

TypeScript adds static typing to JavaScript, enabling early error detection and improved code documentation (Microsoft, 2023). Studies indicate that gradual typing systems reduce runtime errors by 15-20% while enhancing developer productivity through intelligent code completion (Gao et al., 2017). These benefits prove particularly valuable in professional tools requiring long-term maintenance and iterative enhancement.

### 3.4 User Experience Design Principles

The application design draws on established UX principles documented in "Laws of UX" (Yablonski, 2020). Hick's Law suggests that reducing choices improves decision-making speed, which has been implemented through tabbed interfaces that present one level at a time. Miller's Law indicates that chunking information into groups of seven plus or minus two items enhances retention, a principle applied in organizing capability indicators throughout the interface. Fitts's Law demonstrates that larger, closer interactive elements reduce cognitive effort, which is realized through prominent action buttons and clear clickable areas.

Nielsen's heuristics for usability emphasize consistency, error prevention, and user control (Nielsen, 1994). The RMA tool incorporates these principles through persistent navigation that remains consistent across all pages, auto-save functionality that prevents data loss, and clear visual feedback on assessment status that keeps users informed of their progress.

### 3.5 Accessibility and Inclusive Design

Web Content Accessibility Guidelines (WCAG) 2.1 establish technical requirements for digital accessibility (W3C, 2018). Research demonstrates that accessibility features benefit all users, not only those with disabilities (Petrie et al., 2007). The application implements semantic HTML, keyboard navigation, sufficient color contrast, and screen reader compatibility to ensure universal access to professional development resources.

### 3.6 Data Persistence and State Management

Client-side data persistence through browser localStorage API enables offline functionality and reduces server infrastructure requirements (Mozilla Developer Network, 2023). React Context API provides global state management without external dependencies, appropriate for medium-complexity applications (Facebook Inc., 2023). Comparative analyses suggest that Context API offers sufficient performance for applications with moderate state complexity while reducing bundle size compared to Redux or MobX (Accomazzo et al., 2017).

### 3.7 Similar Assessment Platforms

Several digital competency assessment tools inform this project's development. Vitae's online RDF (Researcher Development Framework) planner provides structured self-assessment for researchers but lacks RMA-specific content (Vitae, 2011). Skills Match, developed by the Australasian Research Management Society, offers competency mapping but requires subscription access (ARMS, 2019). Untools.co demonstrates effective minimalist design for complex information architecture (Kharrasov, 2021). The UoA RMA tool differentiates through its specific focus on institutional context, integration of Māori cultural principles, and open accessibility to all staff without authentication barriers.

---

## 4. Project Goals and Objectives

### 4.1 Primary Goals

The project pursues four primary goals. First, it aims to digitize the RMA Capability Framework by transforming it from a static document into an interactive web application that staff can access from any device. Second, it seeks to enable self-assessment by providing RMA staff with intuitive tools to evaluate their current capabilities across all ten competency areas. Third, the application supports development planning by generating personalized recommendations for professional growth based on self-identified capability gaps. Finally, the project ensures accessibility by delivering an inclusive platform that meets WCAG 2.1 AA standards and functions across diverse devices and browsers.

### 4.2 Technical Objectives

From a technical perspective, the project implements a responsive, single-page application using Next.js and React as the core framework. The design features an intuitive tabbed interface for navigating between competency levels, allowing users to focus on one level at a time without feeling overwhelmed. Client-side data persistence using localStorage enables progress saving without requiring server infrastructure or user authentication. The application creates a summary view with exportable reports suitable for development discussions with supervisors or mentors. Cross-browser compatibility and mobile responsiveness ensure that staff can access the tool regardless of their device or preferred browser.

### 4.3 User Experience Objectives

The user experience design reduces cognitive load through progressive disclosure and clear information hierarchy, ensuring that users encounter information in manageable chunks. The interface provides immediate visual feedback on assessment completion status, helping users understand their progress at a glance. Flexible navigation between capabilities includes dropdown selectors for quick jumping and previous/next buttons for sequential exploration. The application supports note-taking and reflection alongside competency selection, encouraging thoughtful self-assessment rather than superficial checkbox completion.

---

## 5. Work Undertaken

### 5.1 Requirements Analysis and Design

Initial project phases involved detailed analysis of the framework document to extract capability definitions, level descriptors, behavioral indicators, and Māori alignment statements. This content mapping ensured comprehensive coverage of all framework elements within the digital interface.

Design mockups explored various information architectures, ultimately selecting a tabbed interface that presents one competency level at a time while maintaining context through persistent capability names and descriptions. Color gradients assigned to each capability provide visual differentiation and enhance navigation clarity.

### 5.2 Technology Stack Selection

After evaluating multiple frameworks, the development team selected Next.js 16 for server-side rendering, optimized routing, and automatic code splitting. React 19 provides the foundation for component-based UI development with hooks for state management. TypeScript 5 adds type safety and enhances the developer experience through intelligent code completion and early error detection. Tailwind CSS 4 enables utility-first styling and responsive design without writing custom CSS. Heroicons provides consistent, accessible iconography throughout the interface. This stack balances modern capabilities with institutional familiarity, as React and TypeScript are widely adopted across university development teams, facilitating future maintenance and enhancement.

### 5.3 Core Feature Implementation

The primary assessment view implements a tabbed interface where users navigate between Foundation, Intermediate, Advanced, and Exemplar levels. Each tab displays detailed behavioral indicators as bullet points, Māori alignment statements with cultural context, "Select as Current" buttons for level selection, and text areas for optional notes and reflection. This design allows users to focus on understanding one level thoroughly before comparing it to others.

React Context API manages assessment state globally, enabling seamless updates across components. The AssessmentContext tracks the current assessment level for each capability, the target development level if different from current, user notes and reflection comments, and timestamps of last updates. This centralized state management ensures consistency across all views and components.

The useEffect hook monitors context changes and automatically saves assessment data to localStorage. This approach ensures users can close the application and return without data loss, while requiring no server infrastructure or authentication system. The automatic saving happens silently in the background, preventing the interruption of user workflow with save prompts or buttons.

A multi-level navigation system supports various user workflows. The capability grid on the landing page enables random access to any capability, while a dropdown selector allows quick jumping between capabilities during assessment. Previous and Next buttons with preview cards show adjacent capabilities, helping users understand their position in the overall framework. Progress indicators show assessment completion status, providing visual motivation to complete the self-assessment.

The summary view aggregates assessment data to display an overview of current levels across all capabilities, identified capability gaps where current levels fall below target levels, and automatically generated development recommendations. The layout is print-optimized for PDF export, enabling staff to share their development plans in meetings with supervisors or during performance reviews.

### 5.4 Cultural Responsiveness Integration

Māori alignment statements appear prominently within each capability level, maintaining the exact wording from the framework document. The application design respects Te Ao Māori principles through preservation of Māori terminology without anglicization, visual hierarchy that elevates cultural content alongside behavioral indicators, inclusive language throughout the interface, and explicit acknowledgment of Te Tiriti o Waitangi in the about and information sections. This integration ensures that cultural considerations are not treated as supplementary content but as fundamental to understanding professional competency in the Aotearoa New Zealand context.

### 5.5 Quality Assurance and Testing

Testing protocols included comprehensive cross-browser testing to verify functionality in Chrome, Firefox, Safari, and Edge. Responsive design testing confirmed usability on desktop viewports of 1920 pixels and above, tablet viewports from 768 to 1024 pixels, and mobile viewports from 375 to 768 pixels. An accessibility audit validated WCAG 2.1 compliance using axe DevTools and manual keyboard navigation to ensure users with diverse abilities could access all features. Data persistence testing confirmed localStorage functionality across browser sessions and privacy modes, including scenarios where users might have restrictive browser settings. User acceptance testing gathered feedback from five RMA staff members on interface clarity and workflow logic, resulting in several refinements to navigation and information presentation.

### 5.6 Deployment and Documentation

The application deploys on Vercel's platform, providing automated continuous integration and deployment from the GitHub repository. Any updates pushed to the main branch trigger automatic builds and deployment, ensuring the live application remains current. Comprehensive documentation includes a technical README with setup instructions and architecture overview for developers, a user guide explaining assessment workflow and feature usage for staff members, framework content mapping showing the relationship between digital and print versions for administrative reference, and contribution guidelines for future enhancements to support ongoing development by university IT teams.

---

## 6. Challenges and Solutions

### 6.1 Information Architecture Complexity

**Challenge**: Presenting 40 distinct levels (10 capabilities × 4 levels) without overwhelming users required careful information design.

**Solution**: The tabbed interface implements progressive disclosure, showing one level at a time while maintaining contextual awareness through persistent headers. Visual color coding and clear typography establish hierarchy and guide attention.

### 6.2 Cultural Content Integration

**Challenge**: Ensuring Māori alignment statements receive appropriate prominence while maintaining interface balance.

**Solution**: Alignment statements appear in dedicated sections with distinct visual styling (subtle background color, italic typography) that honors their significance without separating them from behavioral indicators. This design emphasizes cultural integration rather than tokenistic addition.

### 6.3 Data Persistence Without Authentication

**Challenge**: Enabling progress saving without implementing user accounts or server-side storage.

**Solution**: localStorage provides client-side persistence sufficient for individual professional development tracking. Users understand their assessments remain private to their device, appropriate for self-reflection tools not requiring institutional oversight.

---

## 7. Future Development Plans

### 7.1 Role-Based Filtering (Phase 3)

Once the University finalizes role-mapping datasets, the application will integrate recommended competency levels for specific position types such as Research Project Coordinator, Funding Advisor, and Research Manager. This enhancement will filter capabilities by job relevance, display recommended target levels for each role, compare individual assessments against role expectations, and generate role-specific development pathways. This functionality will help staff understand not only where they currently stand but also what capabilities matter most for their specific position and career trajectory.

### 7.2 Enhanced Reporting

Future iterations will expand summary capabilities to include multi-format export options supporting PDF, CSV, and JSON formats to accommodate different institutional reporting requirements. Longitudinal progress tracking across multiple assessment dates will enable staff to visualize their growth over time, while visual dashboards with charts and graphs will make patterns and trends immediately apparent. Shareable reports for supervisor discussions, implemented as an opt-in feature, will facilitate development conversations while respecting staff privacy preferences.

### 7.3 Evidence Upload

Supporting documentation upload, including certificates, project examples, and testimonials, will strengthen self-assessment validity by connecting reflection with concrete artifacts. This feature transforms the tool from purely subjective self-assessment to evidence-based competency demonstration. Technical implementation will require secure cloud storage integration and file management UI that maintains simplicity while adding functionality.

### 7.4 Collaborative Features

Peer comparison through anonymized, opt-in benchmarking could provide context while respecting individual privacy. Staff could see how their capabilities compare to others in similar roles without compromising confidentiality. Manager review workflows would enable collaborative development planning where appropriate to role and institutional culture, supporting the transition from individual reflection to organizational development planning.

---

## 8. Learning Outcomes and Reflection

This project synthesized technical skill development with research-informed design thinking, yielding several key learnings. Framework translation emerged as more complex than initially anticipated; converting structured text documents into interactive digital experiences requires careful analysis of implicit relationships and user mental models that may not be explicitly stated in the source material. Understanding how users conceptualize progression through competency levels informed interface decisions throughout development.

Cultural responsiveness proved to be a design challenge requiring sustained attention. Meaningful integration of Indigenous perspectives in digital tools extends beyond content inclusion to encompass design philosophy and interface ethics. The project demonstrated that respecting Te Ao Māori principles requires thoughtful consideration of visual hierarchy, terminology presentation, and the relationship between cultural and technical content.

Technology selection involved balancing cutting-edge capabilities with long-term maintainability. The decision to use Next.js and React rather than more experimental frameworks reflects pragmatic assessment of institutional technical capacity. Universities require tools that can be maintained by current and future staff, not just cutting-edge demonstrations that become unmaintainable when developers move on.

User-centered design processes demonstrated their value even for internal professional tools. Initial assumptions about navigation and information presentation changed significantly after observing actual RMA staff interact with early prototypes. The iterative refinement based on user feedback resulted in a more intuitive interface than would have emerged from theoretical design alone. The development process reinforced the value of evidence-based design decisions grounded in both academic literature and practical usability testing.

---

## 9. Conclusion

The RMA Capability Framework Self-Assessment Tool successfully translates the University of Auckland's competency framework into an accessible, engaging digital platform. By leveraging contemporary web technologies and research-informed UX design, the application supports RMA professionals in reflective practice and targeted development planning. Future enhancements will extend functionality while maintaining the tool's core commitment to user autonomy, cultural responsiveness, and professional growth.

---

## References

Accomazzo, A., Murray, N., & Lerner, A. (2017). *Fullstack React: The complete guide to ReactJS and friends*. Fullstack.io.

ARMS (Australasian Research Management Society). (2019). *Skills Match: Competency framework for research management*. Retrieved from https://researchmanagement.org.au

Boud, D., & Falchikov, N. (2006). Aligning assessment with long-term learning. *Assessment & Evaluation in Higher Education*, 31(4), 399-413. https://doi.org/10.1080/02602930600679050

Eva, K. W., & Regehr, G. (2005). Self-assessment in the health professions: A reformulation and research agenda. *Academic Medicine*, 80(10), S46-S54.

Facebook Inc. (2023). *React: A JavaScript library for building user interfaces*. Retrieved from https://react.dev

Galea, K., Francis, L., & Phillips, S. (2015). The ARMA research administrator competency framework. *Perspectives: Policy and Practice in Higher Education*, 19(2), 30-35. https://doi.org/10.1080/13603108.2014.1000292

Gao, Z., Bird, C., & Barr, E. T. (2017). To type or not to type: Quantifying detectable bugs in JavaScript. In *Proceedings of the 39th International Conference on Software Engineering* (pp. 758-769). IEEE.

Janssen, J., Berlanga, A., & Koper, R. (2013). Evaluation of the learning path specification. *Educational Technology & Society*, 15(1), 54-70.

Kerridge, S., & Scott, S. (Eds.). (2018). *Research administration: A professional development guide*. Arma.

Kharrasov, J. (2021). *Untools: Thinking tools and frameworks for better decisions*. Retrieved from https://untools.co

Kirkwood, A., & Price, L. (2014). Technology-enhanced learning and teaching in higher education: What is 'enhanced' and how do we know? A critical literature review. *Learning, Media and Technology*, 39(1), 6-36. https://doi.org/10.1080/17439884.2013.770404

Langley, D., & Ofosu, N. (2007). A case study: Defining the role and activities of the research manager in the UK. *Journal of Research Administration*, 38(1), 45-60.

Microsoft. (2023). *TypeScript: JavaScript with syntax for types*. Retrieved from https://www.typescriptlang.org

Mozilla Developer Network. (2023). *Window.localStorage*. MDN Web Docs. Retrieved from https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

Nielsen, J. (1994). *Usability engineering*. Morgan Kaufmann.

Nielsen Norman Group. (2020). *Single-page applications: Best practices*. Retrieved from https://www.nngroup.com/articles/spa-page-refresh/

Petrie, H., Hamilton, F., & King, N. (2007). Tension, what tension? Website accessibility and visual design. In *Proceedings of the 2004 international cross-disciplinary workshop on Web accessibility* (pp. 13-18). ACM.

Sweller, J., Ayres, P., & Kalyuga, S. (2011). *Cognitive load theory*. Springer.

Vercel. (2023). *Next.js: The React framework for production*. Retrieved from https://nextjs.org

Vitae. (2011). *Researcher Development Framework*. Careers Research and Advisory Centre (CRAC) Limited. Retrieved from https://www.vitae.ac.uk/rdf

W3C. (2018). *Web Content Accessibility Guidelines (WCAG) 2.1*. World Wide Web Consortium. Retrieved from https://www.w3.org/TR/WCAG21/

Yablonski, J. (2020). *Laws of UX: Using psychology to design better products & services*. O'Reilly Media.

---

**Word Count:** ~2,800 words  
**References:** 22 citations (exceeds minimum of 15)

---

## Appendices

**Appendix A**: Link to live application: [URL to be provided]  
**Appendix B**: GitHub repository: [URL to be provided]  
**Appendix C**: Framework document reference: RMAF Version 1.5 (November 2025)
