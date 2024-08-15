## Zen-App

“Zen-App: 
Mental health is gaining attention worldwide, including in Indonesia. Despite growing awareness of its importance, stigma and a lack of understanding still prevent many from seeking help. 
The Zenzone App aims to bridge this gap by offering essential support and resources." This is where the role of the Zenzone App is highly needed to provide the right support and resources.


## Table of Contents

1. [Zen-App](#Zen-App)
2. [Problem Statement](#problem-statement)
3. [Solution](#solution)
4. [Deployment](#deployment)
5. [Tech Stack](#tech-stack)
   - [Languages](#languages)
   - [Libraries and Dependencies](#libraries-and-dependencies)
   - [Database](#database)
   - [Design Tools](#design-tools)
6. [User FLow](#user-flow)
7. [Pages](#pages)
   - [Homepage](#homepage-)
   - [Category Page](#category-page-)
   - [Results Page](#results-page-based-on-gender-and-categories)
   - [Product Detail Page](#product-detail-page--product_id-)
8. [Feature](#feature)
   - [Filtering Option](#filtering-option)
   - [Sorting Functionality](#sorting-functionality)
   - [WhatsApp Integration for Rental](#whatsapp-integration-for-rental)
9. [Prerequisites](#prerequisites)
10. [Run in Local](#run-in-local)
   - [Clone or Pulling from Repo](#clone-or-pulling-from-repo)
   - [Optional Checkout](#optional)
   - [Install Dependency](#instal-dependency)
   - [Run](#run)
   - [Test Build/Deployment](#test-builddeployment)
11. [Folder Structure](#folder-structure)
12. [Future Development Features](#future-development-features)
13. [Team Developer]()


## Problem Statement

- **Increasing Cases of Mental Disorders**:  
  Mental disorders such as stress, anxiety, depression, and other conditions are becoming more common, especially among the younger generation. Rapid changes in lifestyle, academic pressure, and social expectations can be triggering factors.

- **Lack of Access to Mental Health Services**:  
  Many people find it difficult to access quality and affordable mental health services. The limited number of mental health professionals and high service costs often become major obstacles for many individuals to get the help they need.

- **Negative Stigma**:  
  There is still a lot of negative stigma related to mental disorders in society, making people reluctant to acknowledge their problems or seek help. The fear of negative judgment or discrimination often prevents individuals from openly discussing their mental health and getting the necessary treatment.


## Solution

The Zenzone App is developed to address mental health issues by increasing awareness, providing support, facilitating access to resources, encouraging help-seeking behavior, and reducing stigma. It offers a safe online community, accurate information, and tools to manage mental health, thus bridging the gap between individuals and quality mental health care.

## Deployment

- Backend Repository : https://github.com/Adsyarif/Zen-Zone-Server-App
- Platform : 

## Tech stack

### Languages

- Javascript
- Typescript
- HTML
- CSS

### Libraries and dependencies

- Next
- Yarn
- Axios
- Tailwind CSS

### Database

- Supabase 

### Design Tools 

- Figma

## User Flow

![User Flow]()

## Pages

- Homepage = "/homepage"

  **Usage**:  To provide an overview of what the platform offers and guide users to the main sections like Forums, Counseling, or Articles.
  
- Register = "/register"

  **Usage**: To onboard new users by capturing essential information and creating an account.
  
- Login = "/login"

  **Usage**: To authenticate users and grant them access to the platform’s features.

- Forum = "/forum"

  **Usage**: To foster community interaction by providing a platform for discussions on various topics related to the application’s focus.
  
- Consulting = "/consulting"

  **Usage**: To provide users with an easy way to find and book sessions with professional consultants or counselors.
  
- Article = "/article"

  **Usage**: To inform and engage users with high-quality content related to the platform’s niche.

- Diary page = "/diary"

  **Usage**: To allow users to manage their personal diaries within the application, providing easy access to past entries and the ability to add new ones.

- Profile = "/profile"

  **Usage**: To show user profile account.
  

## Feature
  
### Login / Register functionality
   -. Onboard new user to be listed on the database

### Forum Page

- **User Posts**:  
  Users can post their thoughts on the app to share with others.

  - **Comments**:  
    Users can comment on posts to engage in discussions.

  - **Replies**:  
    Users can reply to comments, enabling discussions.

  - **Report**:  
    Users can report posts or comments that violate community guidelines.

  - **Like**:  
    Users can like posts or comments to show their support or agreement.

### Counseling Page

- **Counselor List**:  
  The page displays a list of available counselors.

  - **Filter by Calendar**:  
    Users can filter counselors based on availability using a calendar.

  - **Counselor Details**:  
    Clicking on a counselor shows detailed information, including their profile, specialization, and experience.

  - **Review Feature**:  
    Users can give reviews and ratings to counselors based on their experience.

### Artile Page
- **Article List**
  Counselor can post a article related regarding mental health

### Diary Page
- **User Diary**:  
  Users can write their thoughts and track their mood for each diary entry.
  
- **Edit and Delete**:  
  Users can edit or delete their diary entries as needed.

### Profile Page







  
## Prerequisities

### **Node.js and npm/yarn installed on your machine **
## Note: It is crucial to have Node.js and npm/yarn installed on your machine to run the project locally. If you don't have them installed, please follow the instructions below:
    -.Install Node.js
    -.Install Yarn (recommended) or use npm

## Run in local

### Clone or pulling from repo

(`git pull/clone https://github.com/Adsyarif/Zen-App-Client-App.git`)

### Optional

Checkout to determine branch (`git checkout -b feature`)

### Instal Dependency


yarn install

### Run

yarn dev

### Test build/deployment

yarn build  
yarn preview

### Notes:


## Diagram Architecture

![Product Detail Page](./src/assets/doc/diagramArchitecture.png)


## Future Development Features

### 



### 



### 





## Team Developer

Here is the list of our development team members:

Project Team:



Frontend Engineer:



Backend Engineer:




Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

